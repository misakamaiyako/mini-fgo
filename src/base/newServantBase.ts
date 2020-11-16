import { MoveCard } from '@/base/servant';
import Scenes from '@/base/scenes';

interface DirectlyEffectiveBuff {
  value:number,
  id:Symbol
}

interface Buff {
  id:Symbol,
  buffType:BuffType,
  buffEffect:BuffEffect,
  timer:{
    times:number,
    round:number
  },
  description:() => string,
  shouldRemove:boolean,
  remove:(removePower:number) => boolean,
  activeRate:number,//buff有效的几率，大部分为情况1
  handle:(value:{ actionType:ActionType, [ args:string ]:any }) => boolean//对象处理，必须在开始前判断类型,返回值表示是否对操作生效了
}

interface BuffStack {
  stack:Array<Buff>,
  handle:(value:{ actionType:ActionType, [ args:string ]:any })=>{ actionType:ActionType, [ args:string ]:any }
}

export abstract class ServantBase {
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
   * @description 指令卡，可以为空
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

  get hpMax () {
    return this.#hp + this.strengthenHp + (buffs => {
      let total = 0;
      buffs.forEach(t => {
        total += t.value;
      });
      return total;
    })(this.HpBuff);
  }

  HpRecoverOnRoundEnd:Array<DirectlyEffectiveBuff> = [];
  #hp:number = 0;
  get hp () {
    return Math.ceil(this.#hp);
  }

  set hp (value) {
    this.#hp = value;
  }

  hpAdd (value:number):number {
    if (value > 0) {
      let reference = {actionType:ActionType.heal,value:value}
      this.buffStack.handle(reference)
      this.#hp = Math.min(this.#hp + reference.value, this.hpMax);
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

  /**
   * @description 职阶
   */
  abstract servantClass:ServantClass;

  /**
   * @description 即死率
   */
  abstract deathRate:number;

  /**
   * @description 特殊敌人的能量槽计数
   */
  specialNpBLocks?:number;

  /**
   * @description 能量条类型
   */
  npType:'process' | 'block' | 'none'='process'

  get maxNp () {
    if (this.npType === 'none') {
      return 0;
    } else if (this.npType === 'process') {
      switch (this.noble.leave) {
        case 1:
          return 100;
        case 2:
          return 200;
        case 3:
          return 200;
        case 4:
          return 200;
        case 5:
          return 300;
      }
    } else {
      if (this.specialNpBLocks !== undefined) {
        return this.specialNpBLocks;
      }
      switch (this.servantClass) {
        case 'saber':
          return 4;
        case 'lancer':
          return 4;
        case 'archer':
          return 3;
        case 'rider':
          return 5;
        case 'caster':
          return 5;
        case 'assassin':
          return 3;
        case 'ruler':
          return 4;
        case 'moonCancer':
          return 3;
        case 'avenger':
          return 5;
        case 'berserker':
          return 3;
        case 'shielder':
          return 4;
        case 'foreigner':
          return 5;
        case 'alterEgo':
          return 3;
        default:
          return 4;
      }
    }
    return 0;
  }

  /**
   * @description 宝具
   */
  noble:Noble
  /**
   * @description 指令卡
   */
  abstract MoveCard:Array<MoveCard>;

  /**
   * @description 角色属性
   */
  abstract characteristic:Set<characteristic>;

  /**
   * @description 角色隐藏属性
   */
  abstract hiddenCharacteristic:hiddenCharacteristic;

  /**
   * @description 场景
   */
  scenes?:Scenes;
  buffStack:BuffStack = {
    stack: [],
    handle(value:{ actionType:ActionType, [ args:string ]:any }){
      let activate:Array<Buff> = []
      this.stack.forEach(t=>{
        if (t.handle(value)){
          activate.push(t)
        }
      })
      let counter:'times'|'round' = value.actionType===ActionType.roundEnd?'round':'times'
      activate.forEach(t=>{
        t.timer[counter]--
        if (t.shouldRemove){
          t.remove(Infinity)
        }
      })
      return value
    }
  };

  death () {

  }
}

export abstract class SkillBase {
  abstract name:string;
  abstract coldDown:number;
  owner:ServantBase;
  leave:number = 10;
  abstract valueArray:Array<number>;
  successRateArray:Array<number> = new Array<number>(10).fill(1);
  needChooseTarget:boolean = false;
  active (currentEnemy:ServantBase, currentTarget?:ServantBase) {
    if (this.needChooseTarget && !currentTarget) {
      throw new ReferenceError('没有选择对象');
    }
  }
  constructor (owner:ServantBase) {
    this.owner = owner
  }
}
