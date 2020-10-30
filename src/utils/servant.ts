import { cachedProperty } from '@/decorators';
import { classAttackPatch, hiddenCharacteristicRestraint, restraint } from '@/utils/base';

abstract class Buff {
  abstract onEffect:(servant:ServantBase) => void;
  abstract onRemove:(servant:ServantBase) => void;
  abstract name:string;
  abstract text:string;
  abstract describe:string;
  abstract round:number;
  abstract canRemove:boolean;
}

export class MoveCard {
  color:'red' | 'green' | 'blue' | 'white';

  get basePowerRate () {
    switch (this.color) {
      case 'red':
        return 1.5;
      case 'green':
        return 0.8;
      case 'blue':
        return 1;
      default:
        return 62.5;
    }
  }

  npRate:number;
  fufuAttack:number = 0;
  starRate:number = 0;
  criticDropRate:number;
  criticRate:number = 0;
  baseCriticRate:number = 0;
  criticPowerUp:number = 0;
  commanderCard?:CommanderCard;
  _improvement:number = 0;

  // hits:Array<number>;
  get hitsRate ():number {
    let total:number = 0;
    this.hitsChain.forEach(t => {
      total += t;
    });
    return total;
  }

  state:'pool' | 'active' | 'used' = 'pool';
  hitsChain:Array<number> = [ 100 ];

  get improvement () {
    return this._improvement;
  }

  set improvement (value) {
    let current = this._improvement + value;
    this._improvement = Math.min(Math.max(current, -100), 500);
  }

  constructor (color:'red' | 'green' | 'blue' | 'white', npRate:number, hitsChain:Array<number>, fufuAttack:number = 0, baseCriticRate:number = 0, CommanderCardId?:number) {
    this.color = color;
    this.npRate = npRate;
    this.fufuAttack = fufuAttack;
    this.baseCriticRate = baseCriticRate;
    this.hitsChain = hitsChain;
    this.criticDropRate = 0;// todo connect with class and color
    if (CommanderCardId) {
      this.commanderCard = new CommanderCard(CommanderCardId, this);
    }
  }

}

export class ExtraCard extends MoveCard {
  constructor (npRate:number, hits:Array<number>) {
    super('white', npRate, hits);
  }

}

class CommanderCard {
  constructor (id:number, moveCard:MoveCard) {
  }
}

export abstract class ServantBase {
  protected constructor (props) {
    this.position = props.position
    this.baseMaxHp = props.baseMaxHp
  }

  abstract servantClass:ServantClass;
  abstract servantName:string;
  position:'friendly' | 'stranger' | 'enemy' | 'specialNull';
  baseMaxHp:number;
  effectHpUp:number = 0;

  _atk:number;
  _atkPowerUp:Array<{ powerUp:number, id:Symbol }> = [];

  get atkPowerUp () {
    let base:number = 1;
    let attach:number = 0;
    this._atkPowerUp.forEach(t => {
      if (t.powerUp < 1) {
        base += t.powerUp;
      } else {
        attach += t.powerUp;
      }
    });
    return {
      base,
      attach,
    };
  }

  criticPowerUp:number = 1;

  get maxHp () {
    return this.baseMaxHp + this.effectHpUp;
  }

  _hp:number = 0;
  get hp ():number {
    return Math.floor(this._hp);
  }

  set hp (value) {
    const changedHp = this._hp + value;
    if (changedHp <= 0) {
      this._hp = 0;
      this.death();
    } else {
      this._hp = Math.min(changedHp, this.maxHp);
    }
  }

  @cachedProperty
  get npType ():'process' | 'block' | 'none' {
    if (this.position === 'friendly') {
      return 'process';
    } else if (this.position === 'stranger') {
      return 'none';
    } else if (this.position === 'enemy') {
      return 'block';
    } else {
      return 'none';
    }
  }

  specialNpBLocks?:number;
  nobleLeave:number;

  @cachedProperty
  get maxNp () {
    if (this.npType === 'none') {
      return 0;
    } else if (this.npType === 'process') {
      switch (this.nobleLeave) {
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

  _np:number = 0;
  get np () {
    return this._np;
  }

  set np (value) {
    if (this.npType === 'none') {
      return;
    }
    let current = this._np;
    if (this.npType === 'block') {
      const blocks = (value / 30) | 1;
      this._np = Math.min(current + blocks, this.maxNp);
    } else {
      let added = current + value;
      if (value > 0 && (added | 1) === 100) {
        added = 100;
      }
      this._np = Math.min(this.maxNp, added);
    }
  }

  _defenceBuff:Array<{ powerUp:number, id:Symbol }> = [];

  get defencePowerUp () {
    let base:number = 1;
    let attach:number = 0;
    this._defenceBuff.forEach(t => {
      if (t.powerUp < 1) {
        base += t.powerUp;
      } else {
        attach += t.powerUp;
      }
    });
    // @ts-ignore
    return {
      base: Math.max(-100, base),
      attach,
    };
  }

  moveProcesses:Array<MoveProcess> = [];
  abstract CommanderCard:Array<CommanderCard>;

  abstract characteristic:Array<string>;
  abstract hiddenCharacteristic:hiddenCharacteristic;

  specialAttack (target:ServantBase, moveCard:MoveCard):number {
    let base = 0;
    this.moveProcesses.forEach(t => {
      if (t.onAttack && t.test('attack', this, target, moveCard)) {
        base += t.onAttack(this, target, moveCard);
      }
    });
    return base;
  }

  specialDefend (attacker:ServantBase, moveCard:MoveCard) {
    let base = { base:0,attach:0 };
    this.moveProcesses.forEach(t => {
      if (t.onDefence && t.test('defend', this, attacker, moveCard)) {
        const temp = t.onDefence(this, attacker, moveCard)
        base.base+=temp.base;
        base.attach+=temp.attach
      }
    });
    return base;
  }

  attackNormal (target:ServantBase, moveCard:MoveCard, position:0 | 1 | 2 | 3, redStart:number, ExtraCoefficient:3.5 | 2 | 1, busterChain:boolean = false) {
    // (ATK * 0.23 * ((指令卡伤害倍率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性)) + 首位加成) * 职阶补正 * 职阶克制 * 隐藏属性克制 * (1 ± 攻击力BUFF ∓ 防御力BUFF - 特防状态BUFF) * (1 + 暴击补正) * (1 + 特攻状态加成 ± 暴击威力BUFF * 暴击补正) * Extra攻击加成 * 指令卡Hit倍率 * 随机数) ± 伤害附加与减免 ∓ 被伤害减免与提升 + BusterChain加成
    this.moveProcesses.forEach(t => {
      if (t.beforeAttack && t.test('attack', this, target, moveCard)) {
        t.beforeAttack(this, target, moveCard);
      }
    });
    target.moveProcesses.forEach(t => {
      if (t.beforeDefence && t.test('defend', target, this, moveCard)) {
        t.beforeDefence(target, this, moveCard);
      }
    });
    const defence = target.defencePowerUp;
    const specialDefend = target.specialDefend(target, moveCard)
    // let baseAttack = this._atk;
    const critic = (Math.random() <= moveCard.criticRate ? 1 : 0);
    const damage =
      this._atk *
      0.23 *
      (
        moveCard.basePowerRate *
        (1 + 0.2 * position) *
        (1 + moveCard.improvement - specialDefend.attach + redStart) *
        classAttackPatch(this.servantClass) *
        restraint(this.servantClass, target.servantClass) *
        hiddenCharacteristicRestraint(this.hiddenCharacteristic, target.hiddenCharacteristic) *
        (
          1 + this.atkPowerUp.base - defence.base - specialDefend.base
        ) *
        (
          1 + critic
        ) *
        (
          1 + this.specialAttack(target, moveCard) + (this.criticPowerUp + moveCard.criticPowerUp) * critic
        ) *
        (position === 3 ? 1 : 1) *
        ExtraCoefficient *
        moveCard.hitsRate *
        (0.9 + Math.random() * 0.2)
      ) +
      this.atkPowerUp.attach -
      target.defencePowerUp.attach +
      (position === 3 ? 0 : busterChain ? this._atk * 0.2 : 0);
    target.hp -= damage;
    this.moveProcesses.forEach(t => {
      if (t.afterAttack && t.test('afterAttack', this, target, moveCard)) {
        t.afterAttack(this, target, moveCard);
      }
    });
    target.moveProcesses.forEach(t => {
      if (t.afterDefence && t.test('afterDefend', target, this, moveCard)) {
        t.afterDefence(target, this, moveCard);
      }
    });
  }

  death () {
  }
}

