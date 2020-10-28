import { cachedProperty } from '@/decorators';

interface Skill {
  selfId:number,
  name:string,
  leave:number,
  coolDown:number,
  effect:(servant:ServantBase)=>void
}

type servantClass =
  'saber'
  | 'lancer'
  | 'archer'
  | 'rider'
  | 'caster'
  | 'assassin'
  | 'ruler'
  | 'moonCancer'
  | 'avenger'
  | 'berserker'
  | 'shielder'
  | 'foreigner'
  | 'alterEgo'
  | 'beast1'
  | 'beast2'
  | 'beast3'
  | 'beast4'
  | 'beast5'
  | 'beast6'
  | 'beast7'

interface moveProcess {
  id:symbol,
  beforeAttack?:()=>number,
  beforeDefence?:()=>number,
  onAttack?:()=>void,
  onDefence?:()=>void,
  onAttackEnd?:()=>void,
  onDefenceEnd?:()=>void,
  test:(attacker:ServantBase,defender:ServantBase,card:MoveCard)=>boolean
}

abstract class Buff {
  abstract onEffect:(servant:ServantBase) => void;
  abstract onRemove:(servant:ServantBase) => void;
  abstract name:string;
  abstract text:string;
  abstract describe:string;
  abstract round:number;
  abstract canRemove:boolean;
}

class MoveCard {
  color:'red' | 'green' | 'blue' | 'white';
  get basePowerRate(){
    switch (this.color){
      case 'red':return 1.5;
      case 'green': return 0.8;
      case 'blue':return 1;
      default: return 62.5
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
  hits:Array<number>;
  hitsRate:number = 100;// notice 天草四郎和黑枪呆
  get improvement () {
    return this._improvement;
  }

  set improvement (value) {
    let current = this._improvement + value;
    this._improvement = Math.min(Math.max(current, -100), 500);
  }

  constructor (color:'red' | 'green' | 'blue' | 'white', npRate:number, hits:Array<number>, fufuAttack:number = 0, baseCriticRate:number = 0, CommanderCardId?:number) {
    this.color = color;
    this.npRate = npRate;
    this.fufuAttack = fufuAttack;
    this.baseCriticRate = baseCriticRate;
    this.hits = hits;
    this.criticDropRate = 0;// todo connect with class and color
    if (CommanderCardId) {
      this.commanderCard = new CommanderCard(CommanderCardId, this);
    }
  }

}

class ExtraCard extends MoveCard {
  constructor (npRate:number, hits:Array<number>) {
    super('white', npRate, hits);
  }

}

class CommanderCard {
  constructor (id:number, moveCard:MoveCard) {
  }
}

abstract class ServantBase {
  abstract servantClass:servantClass;
  abstract servantName:string;
  position:'friendly' | 'stranger' | 'enemy' | 'specialNull';
  baseMaxHp:number;
  equipmentBaseHpUp:number = 0;
  effectHpUp:number = 0;

  _atk:number;
  _atkBuff:Array<{powerUp:number,id:Symbol}>

  get atkBuff(){
    let base:number = 0
    let attach:number = 0
    this._atkBuff.forEach(t=>{
      if (t.powerUp<1){
        base+=t.powerUp
      } else {
        attach+=t.powerUp
      }
    })
    return {
      base,
      attach
    }
  }

  get maxHp () {
    return this.baseMaxHp + this.equipmentBaseHpUp + this.effectHpUp;
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

  abstract specialNpBLocks?:number;
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

  _defence:number = 0;

  get defence () {
    return Math.max(-100, this._defence);
  }

  set defence (value) {
    this._defence += value;
  }

  attackEffect:Array<moveProcess> =[]
  defenceEffect:Array<moveProcess> =[]
  abstract CommanderCard:Array<CommanderCard>;

  abstract characteristic:Array<string>;
  abstract hiddenCharacteristic:Array<string>;

  attackNormal(target:ServantBase,moveCard:MoveCard,position:1|2|3|4,redStart:number){
    // (ATK * 0.23 * ((指令卡伤害倍率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性)) + 首位加成) * 职阶补正 * 职阶克制 * 隐藏属性克制 * (1 ± 攻击力BUFF ∓ 防御力BUFF - 特防状态BUFF) * (1 + 暴击补正) * (1 + 特攻状态加成 ± 暴击威力BUFF * 暴击补正) * Extra攻击加成 * 指令卡Hit倍率 * 随机数) ± 伤害附加与减免 ∓ 被伤害减免与提升 + BusterChain加成
    let baseAttack = this._atk
    const damage = this._atk*0.23*(moveCard.basePowerRate*(0.8+0.2*position)*(1+moveCard.improvement-(()=>{
      let buff:number = 0;
      (target.defenceEffect.forEach(t=>{
        if (t.beforeDefence&&t.test(this,target,moveCard)){
          buff += t.beforeDefence()
        }
      }))
      return buff
    })())+redStart)
  }

  death () {
  }
}

