import Scenes from '@/utils/scenes';
import { allAttackUp, busterUp } from '@/utils/EffectDatabase';
import { ServantBase } from '@/utils/servant';

class Effect {

}

export abstract class SkillBase {
  owner:ServantBase;

  constructor (owner:ServantBase, leave:number, state:'normal' | 'seal' | 'deprecated') {
    this.level = leave;
    this.state = state;
    this.owner = owner;
  }

  /**
   * @description 场景，进入战斗之后才有
   */
  scenes:Scenes | undefined;
  /**
   * @description 技能效果，每一步只执行一种效果
   */
  abstract steps:Array<(level:number) => Function>;

  /**
   * @description 冷却时间
   */
  get cooldown () {
    return this.totalCooldown - (this.level >= 6 ? 1 : 0) - (this.level === 10 ? 1 : 0);
  };

  abstract totalCooldown:number;

  /**
   * @description 效果和技能等级关系的数组
   */
  abstract effects:Array<Array<number>>;

  remainCooldown:number = 0;
  /**
   * @description 技能等级
   */
  level:number;

  state:'normal' | 'seal' | 'deprecated';

  use () {
    this.steps.forEach(t => {
      t(this.level)();
    });
  }
}

export class LeaderShipB extends SkillBase {
  steps = [
    (leave:number) => allAttackUp.bind(this, this.scenes as Scenes, () => true, Symbol('leadership'), this.effects[ 0 ][ leave ]),
  ];
  effects:Array<Array<number>> = [
    [ .09, .099, .108, .117, .126, .135, .144, .153, .162, .18 ],
  ];
  totalCooldown:number = 7;
}

export class MagicReleaseA extends SkillBase {
  effects = [
    [ .30, .32, .34, .36, .38, .40, .42, .44, .46, .50 ],
  ];
  totalCooldown = 7;
  steps = [
    (leave:number) => busterUp.bind(this, this.scenes as Scenes, (servant:ServantBase) => servant === this.owner, Symbol('MagicReleaseA'), this.effects[ 0 ][ leave ])
  ];
}
