import { MoveCard } from '@/base/servant';

enum BuffType {
  strengthen, weaken, notDuality
}

enum AttackBuffEffect {
  attack = 100,//攻击
  moveCardPerformance,//指令卡性能
  specialAttack,//特攻
  damageAttach,//伤害附加
  moveCardAttack,//指令卡威力
  criticalPower,//暴击伤害
  criticalChance,//暴击率
  noblePower,//宝具伤害
  ignoreAvoid,//必中
  ignoreInvincible,//无敌贯通
  ignoreDefence//无视防御
}

enum defenceBuffEffect {
  defence = 200,//防御
  defenceAttach,//防御附加
  specialDefence,//特防
  moveCardEndurance,//色卡耐性
  avoid,//闪避
  invincible,//无敌
  againstPurge,//对肃正防御
  toughness//韧性
}

enum Critical {
  concentrated = 300,//暴击星集中
  drop,//暴击星掉落率
  gain//获得暴击星
}

enum NPState {
  gainRate = 400,//np率
  gainRateOnTurnEnd,//回合结束时np获得
  gainRateOnGetHit//受击np率
}

enum HPState {
  recoverCoefficient = 500,//恢复系数
  recoverByTurnEnd,//回合结束时恢复
  maxHP//最大生命值变化
}

enum AdditionalEffect {
  afterAttack = 600
}

enum OtherEffect {
  targetConcentrated = 700,//目标集中
  statusSetChance,//状态赋予成功率
  specialEndurance,//特殊耐性
  weakenEndurance,//弱化耐性
  noStrengthen,//强化无效
  noWeaken,//弱化无效
  strengthenRemoveEndurance,//强化解除耐性
  weakenRemoveEndurance,//弱体解除耐性
  beCriticalChance,//被暴击率
  dieChance,//即死成功率
  dieEndurance,//即死抗性
  maxDieEndurance,//即死抗性满（不能即死）
  mentalDisorder,//精神类异常
  dot,//dot类伤害
  delayed,//延迟效果
  others
}

enum OtherEffect2 {
  others = 800
}

type BuffEffect =
  AttackBuffEffect
  | defenceBuffEffect
  | Critical
  | NPState
  | HPState
  | AdditionalEffect
  | OtherEffect
  | OtherEffect2

interface DirectlyEffectiveBuff {
  value:number,
  id:Symbol
}

interface Buff {
  id:Symbol,
  buffType:BuffType,
  buffEffect:BuffEffect,
  test:(...args:any) => boolean,
  timer:{
    times:number,
    round:number
  },
  value:number,
  description:() => string,
  shouldRemove:boolean,
  remove:(removePower:number) => boolean,
  chance:number//赋予成功的几率，大部分为情况1
}

interface BuffStack {
  stack:Array<Buff>,
  push:(buff:Array<Buff>) => boolean,
  find:(buffType:BuffType | 'all', buffEffect:BuffEffect | 'all') => Array<Buff>
}

abstract class ServantBase {
  /**
   * @description id
   */
  abstract id:number;

  /**
   * @description 名称
   */
  abstract name:string;

  /**
   * @description 主动技能组，可以为空
   */
  abstract skills:Array<Skill>;

  /**
   * @description 被动技能组
   */
  abstract positiveSkill:Array<Skill>;
  /**
   * @description 等级
   */
  level:number = 0;

  /**
   * @description 是否使用成长曲线计算血量
   * @todo 添加成长曲线
   */
  abstract useDefaultHPLine:boolean;

  /**
   * @description 指令卡，可以为空数组
   */
  moveCard:Array<MoveCard> = [];

  /**
   * @description 血量
   */
  baseHp:number = 0;
  strengthenHp:number = 0;//fufu
  HpRecoverCoefficient:number = 1;
  suitHp:number = 0;
  HpBuff:Array<DirectlyEffectiveBuff> = [];
  HpRecoverOnRoundEnd:Array<DirectlyEffectiveBuff> = [];
  #hp:number = 0;
  get hp () {
    return Math.ceil(this.#hp);
  }

  set hp (value) {
    console.warn('you should use this only when max hp is changed');
    console.warn('use hpAdd(change:number) to change hp');
    this.#hp = value;
  }

  hpAdd (value:number):number {
    if (value > 0) {
      this.#hp += value * this.HpRecoverCoefficient;
      this.buffStack.find(BuffType.strengthen, HPState.recoverCoefficient).forEach(t => {
        t.timer.times--;
        if (t.shouldRemove) {
          t.remove(Infinity);
        }
      });
    } else {
      this.#hp -= value;
      if (this.hp <= 0) {
        this.#hp = 0;
        this.death();
      }
    }
    return this.hp;
  }

  /**
   * @description 攻击力
   */
  baseAttack:number = 0;
  strengthenAttack:number = 0;//fufu
  suitAttack:number = 0;

  buffStack:BuffStack = {
    stack: [],
    push: (buff:Array<Buff>) => {
      let shouldRemove:Array<Buff> = [];
      let strengthen:Array<Buff> = [];
      let weaken:Array<Buff> = [];
      let notDuality:Array<Buff> = [];
      buff.forEach(b => {
        strengthen.push(b);
        switch (b.buffType) {
          case BuffType.strengthen:
            strengthen.push(b);
            break;
          case BuffType.weaken:
            weaken.push(b);
            break;
          case BuffType.notDuality:
            notDuality.push(b);
            break;
        }
      });
      if (strengthen.length>0){

      }
      return true;
    },
    find (buffType:BuffType | 'all', buffEffect:BuffEffect | 'all') {
      let typeSuited = buffType === 'all' ? this.stack : this.stack.filter(t => t.buffType === buffType);
      return buffEffect === 'all' ? typeSuited : typeSuited.filter(t => t.buffEffect === buffEffect);
    },
  };

  death () {

  }
}
