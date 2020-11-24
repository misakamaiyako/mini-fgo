import Scenes from '@/base/scenes';
import Noble from '@/base/noble';
import MoveCard from '@/base/moveCard';

interface DirectlyEffectiveBuff {
  value:number,
  id:Symbol
}

interface BuffStack {
  stack:Array<Buff>,
  handle:<T extends { actionType:ActionType, [ args:string ]:any }>(value:T) => T
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
   * @description 指令卡，可以为空
   */
  moveCard:Array<MoveCard> = [];

  /**
   * @description 血量
   */
  abstract baseHp:number;
  strengthenHp:number = 0;//fufu
  suitHp:number = 0;
  HpBuff:number = 0;

  //掉星率
  abstract starDropRate:number;

  get hpMax () {
    return this.baseHp + this.strengthenHp + this.suitHp + this.HpBuff;
  }

  #hp:number = 0;
  get hp () {
    return Math.ceil(this.#hp);
  }

  set hp (value) {
    this.#hp = value;
  }

  hpAdd (value:number, damageEnd:boolean = true):number {
    if (value > 0) {
      let reference = { actionType: ActionType.heal, value: value };
      this.buffStack.handle(reference);
      this.#hp = Math.min(this.#hp + reference.value, this.hpMax);
    } else {
      this.#hp -= value;
      if (this.hp <= 0) {
        this.#hp = 0;
        if (damageEnd) {
          this.death();
        }
      }
    }
    return this.hp;
  }

  //受击np率
  abstract npRate:number;
  #np:number = 0;

  get np () {
    return this.#np | 0;
  }

  set np (value) {
    this.#np = Math.max(0, Math.min((this.#np + value), this.maxNp));
    if (this.#np > 99 && this.#np < 100) {
      this.#np = 100;
    } else if (this.#np < 0) {
      this.#np = 0;
    }
  }

  /**
   * @description 攻击力
   */
  abstract baseAttack:number = 0;
  strengthenAttack:number = 0;//fufu
  suitAttack:number = 0;

  get atk () {
    return this.baseAttack + this.strengthenAttack + this.suitAttack;
  }

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
  npType:'process' | 'block' | 'none' = 'process';

  get maxNp () {
    if (this.npType === 'none') {
      return 0;
    } else if (this.npType === 'process') {
      switch (this.noble?.leave) {
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
        case ServantClass.saber:
          return 4;
        case ServantClass.archer:
          return 3;
        case ServantClass.lancer:
          return 4;
        case ServantClass.rider:
          return 5;
        case ServantClass.caster:
          return 5;
        case ServantClass.assassin:
          return 3;
        case ServantClass.berserker:
          return 3;
        case ServantClass.ruler:
          return 4;
        case ServantClass.avenger:
          return 5;
        case ServantClass.alterego:
          return 3;
        case ServantClass.moonCancer:
          return 3;
        case ServantClass.foreigner:
          return 5;
        case ServantClass.shielder:
          return 4;
        default:
          return 4;
      }
    }
    return 0;
  }

  /**
   * @description 宝具
   */
  abstract noble:Noble;
  /**
   * @description 指令卡
   */
  abstract MoveCard:Array<MoveCard>;

  /**
   * @description 角色特性
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
    handle (value) {
      let activate:Set<Buff> = new Set();
      this.stack.forEach(t => {
        if (t.handle(value)) {
          activate.add(t);
        }
      });
      let counter:'times' | 'round' = value.actionType === ActionType.roundEnd ? 'round' : 'times';
      activate.forEach(t => {
        t.timer[ counter ]--;
        if (t.shouldRemove) {
          t.remove(Infinity);
        }
      });
      return value;
    },
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
    this.owner = owner;
  }
}




