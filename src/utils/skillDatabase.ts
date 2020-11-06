import Scenes from '@/utils/scenes';
import { leadership } from '@/utils/EffectDatabase';
class Effect {

}
export abstract class SkillBase{
  constructor (props: { cooldown: number; leave: number; }) {
    this.cooldown=props.cooldown;
    this.leave = props.leave
  }

  /**
   * @description 场景，进入战斗之后才有
   */
  scenes:Scenes|undefined;
  /**
   * @description 技能效果，每一步只执行一种效果
   */
  abstract steps:Array<()=>Function>;
  /**
   * @description 冷却时间
   */
  cooldown:number;

  remainCooldown:number=0
  /**
   * @description 技能等级
   */
  leave:number;

  state:'normal'|'seal'|'deprecated'='normal'

  use(){
    this.steps.forEach(t=>{
      t()()
    })
  }
}

export class LeaderShip extends SkillBase{
  steps = [
    ()=>leadership.bind(this,this.scenes as Scenes,()=>true,Symbol('leadership'),0.2)
  ];
}
