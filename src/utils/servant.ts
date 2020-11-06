import { classAttackPatch, hiddenCharacteristicRestraint, restraint } from '@/utils/base';
import { SkillBase } from '@/utils/skillDatabase';
import Scenes from '@/utils/scenes';

abstract class Buff {
  abstract onEffect:(servant:ServantBase) => void;
  abstract onRemove:(servant:ServantBase) => void;
  abstract name:string;
  abstract text:string;
  abstract describe:string;
  abstract round:number;
  abstract canRemove:boolean;
}

/**
 * @description 指令卡类
 */
export class MoveCard {
  /**
   * @description 颜色
   */
  color:moveCardColor;

  /**
   * @description 攻击倍率
   */
  get basePowerRate () {
    switch (this.color) {
      case 'buster':
        return 1.5;
      case 'quick':
        return 0.8;
      case 'art':
        return 1;
      default:
        return 0.625;
    }
  }

  /**
   * @description np率
   */
  npRate:number;
  /**
   * @description 芙芙攻击
   */
  fufuAttack:number = 0;
  /**
   * @description 集星率
   */
  starRate:number = 0;
  /**
   * @description 暴击星掉落率
   */
  criticDropRate:number;
  /**
   * @description 暴击几率，己方为星星数，敌方为固定值
   */
  criticRate:number = 0;
  /**
   * @description 单张行动卡的暴击威力提升
   */
  criticPowerUp:number = 0;

  /**
   * @description 星权 继承自从者
   */
  criticStarRate:number = 0;

  /**
   * @description 星权提升
   */
  criticStarRateUp:number = 0;

  /**
   * @description 随机星权
   */
  randomCriticStarRate:number = 0;

  /**
   * @description 实际当前回合星权
   */
  get actualCriticStarRate () {
    return this.criticStarRate * (1 + this.criticStarRateUp) + this.randomCriticStarRate;
  }

  /**
   * @description 指令纹章
   */
  commanderCard?:CommanderCard;

  /**
   * @description Hit倍率
   */
  get hitsRate ():number {
    let total:number = 0;
    this.hitsChain.forEach(t => {
      total += t;
    });
    return total;
  }

  /**
   * @description 四个状态分别对应 在指令卡池，当前回合被抽中， 被选择，被使用过
   */
  state:'pool' | 'active' | 'selected' | 'used' = 'pool';

  /**
   * @description 是否有用，true或者异常状态描述
   */
  usable:true | string = true;
  /**
   * @description 每一击伤害分布，基本总和为100，除天草extra和阿尔托莉雅（lancer）的蓝卡
   */
  hitsChain:Array<number> = [ 100 ];

  /**
   * @description 色卡性能
   */
  _improvement:number = 0;
  get improvement () {
    return Math.min(Math.max(this._improvement, -100), 500);
  }

  set improvement (value) {
    this._improvement = this._improvement + value;
  }

  constructor (value:{ color:moveCardColor, npRate:number, hitsChain:Array<number>, fufuAttack?:number, CommanderCardId?:number }) {
    this.color = value.color;
    this.npRate = value.npRate;
    this.hitsChain = value.hitsChain;
    this.criticDropRate = 0;// todo connect with class and color
    if (value.fufuAttack) {
      this.fufuAttack = value.fufuAttack;
    }
    if (value.CommanderCardId) {
      this.commanderCard = new CommanderCard(value.CommanderCardId, this);
    }
  }

}

/**
 * @description 额外指令卡
 */
export class ExtraCard extends MoveCard {
  constructor (npRate:number, hits:Array<number>) {
    super({ color: 'extra', npRate: 0, hitsChain: [ 100 ] });
  }
}

/**
 * @description 指令纹章
 */
class CommanderCard {
  constructor (id:number, moveCard:MoveCard) {
  }
}

/**
 * @description 从者基础设置
 */
export abstract class ServantBase {
  protected constructor (props:{ baseMaxHp:number; atk:number; nobleLeave:number; }) {
    this.baseMaxHp = props.baseMaxHp;
    this._hp = props.baseMaxHp;
    this._atk = props.atk;
    this.nobleLeave = props.nobleLeave;
  }

  /**
   * @description 职阶
   * @abstract
   */
  abstract servantClass:ServantClass;

  /**
   * @description 从者真名
   * @abstract
   */
  abstract servantName:string;

  /**
   * @description 被击np率
   * @abstract
   */
  abstract hitNpRate:number;

  /**
   * @description 即死率
   */
  abstract deathRate:number;

  /**
   * @description 技能组，未开放，已进化的技能设置为不可用,test检测技能是不是可用，比如吃星星
   */
  abstract skills:Array<{ usable:boolean, skill:SkillBase, test?:(...arg:any) => boolean }>;

  /**
   * @description 友方， 陌生人助战， 敌人，特别np槽，一般也是敌人
   */
  position:'friendly' | 'stranger' | 'enemy' | 'special' = 'friendly';

  /**
   * @description 基础最大hp 包括礼装给的
   */
  baseMaxHp:number;

  /**
   * @description buff提升的最大hp
   */
  effectHpUp:number = 0;

  /**
   * @description 基础攻击，包括礼装给的
   */
  _atk:number;

  /**
   * @description 攻击力buff，暴扣提升和降低
   * @param powerUp 大于1时视为固定附加伤害，小于1视为百分比提升
   */
  atkBuffChunk:Array<{ powerUp:number, id:Symbol }> = [];

  /**
   * @description 获取总计的伤害提升和伤害附加
   */
  get atkPowerUp () {
    let base:number = 1;
    let attach:number = 0;
    this.atkBuffChunk.forEach(t => {
      if (Math.abs(t.powerUp) < 1) {
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

  /**
   * @description 获取暴击伤害，不计算只赋予某些行动卡的暴击伤害
   */
  criticPowerUp:number = 1;

  /**
   * @description 获取总的最大生命值
   */
  get maxHp () {
    return this.baseMaxHp + this.effectHpUp;
  }

  /**
   * @description 当前生命值
   * @private
   */
  _hp:number = 0;

  /**
   * @description 显示的生命值
   */
  get hp ():number {
    return Math.floor(this._hp);
  }

  set hp (value) {
    const changedHp = this._hp + value;
    if (changedHp <= 0) {
      this._hp = 0;
      // this.death();
    } else {
      this._hp = Math.min(changedHp, this.maxHp);
    }
  }

  /**
   * @description 能量条类型
   */
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

  /**
   * @description 特殊敌人的能量槽计数
   */
  specialNpBLocks?:number;

  /**
   * @description 宝具等级
   */
  nobleLeave:number;

  /**
   * @description 能量最大值
   */
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

  /**
   * @description 实际的能量值
   */
  _np:number = 0;

  /**
   * @description 显示的能量值
   */
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

  /**
   * @description 常驻防御buff，小于1视为百分比变化，大于1为伤害附加或减免，特防在moveProcess.onDefend时返回
   */
  _defenceBuff:Array<{ powerUp:number, id:Symbol }> = [];

  /**
   * @description 总计的常驻防御变化
   */
  get defencePowerUp () {
    let base:number = 1;
    let attach:number = 0;
    this._defenceBuff.forEach(t => {
      if (Math.abs(t.powerUp) < 1) {
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

  /**
   * @description 实际buff影响
   */
  moveProcesses:Array<MoveProcess> = [];
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

  /**
   *
   * @param target 被攻击的角色
   * @param moveCard 行动卡
   * @description 特攻计算
   */
  specialAttack (target:ServantBase, moveCard:MoveCard):number {
    let base = 0;
    this.moveProcesses.forEach(t => {
      if (t.onAttack) {
        base += t.onAttack(this, target, moveCard);
      }
    });
    return base;
  }

  /**
   *
   * @param attacker 攻击者
   * @param moveCard 行动卡
   * @description 特防计算，attach色卡耐性, base特防防御
   */
  specialDefend (attacker:ServantBase, moveCard:MoveCard) {
    let base = { base: 0, attach: 0 };
    this.moveProcesses.forEach(t => {
      if (t.onDefence) {
        const temp = t.onDefence(this, attacker, moveCard);
        base.base += temp.base;
        base.attach += temp.attach;
      }
    });
    return base;
  }

  /**
   *
   * @param target 被攻击的从者
   * @param moveCard 行动卡
   * @param position 卡位
   * @param redStart 是否红卡开头
   * @param ExtraCoefficient extra攻击加成
   * @param busterChain 是不是三红
   */
  attackNormal (target:ServantBase, moveCard:MoveCard, position:0 | 1 | 2 | 3, redStart:number, ExtraCoefficient:3.5 | 2 | 1, busterChain:boolean = false) {
    // (ATK * 0.23 * ((指令卡伤害倍率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性)) + 首位加成) * 职阶补正 * 职阶克制 * 隐藏属性克制 * (1 ± 攻击力BUFF ∓ 防御力BUFF - 特防状态BUFF) * (1 + 暴击补正) * (1 + 特攻状态加成 ± 暴击威力BUFF * 暴击补正) * Extra攻击加成 * 指令卡Hit倍率 * 随机数) ± 伤害附加与减免 ∓ 被伤害减免与提升 + BusterChain加成
    this.moveProcesses.forEach(t => {
      if (t.beforeAttack) {
        t.beforeAttack(this, target, moveCard);
      }
    });
    target.moveProcesses.forEach(t => {
      if (t.beforeDefence) {
        t.beforeDefence(target, this, moveCard);
      }
    });
    const defence = target.defencePowerUp;
    const specialDefend = target.specialDefend(target, moveCard);
    // let baseAttack = this._atk;
    const critic = (Math.random() <= (moveCard.criticRate / 100) ? 1 : 0);
    const damage = (
      this._atk * 0.23 *
      ((moveCard.basePowerRate * (1 + moveCard.improvement - specialDefend.attach)) + redStart) *
      classAttackPatch(this.servantClass) *
      restraint(this.servantClass, target.servantClass) *
      hiddenCharacteristicRestraint(this.hiddenCharacteristic, target.hiddenCharacteristic) *
      (1 + this.atkPowerUp.base - defence.base - specialDefend.base) *
      (1 + critic) *
      (1 + this.specialAttack(target, moveCard) + (this.criticPowerUp + moveCard.criticPowerUp) * critic) *
      (position === 3 ? ExtraCoefficient : 1) *
      moveCard.hitsRate / 100 *
      (0.9 + Math.random() * 0.2)) +
      this.atkPowerUp.attach - defence.attach + (position === 3 ? 0 : busterChain ? this._atk * 0.2 : 0);
    target.hp -= damage;
    moveCard.hitsChain.forEach(t => {
      console.log('damage: ' + damage * t / 100);
    });
    if (this.npType === 'process') {
      // 每一hit的NP获得公式：
// NP率 * (指令卡补正 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性) + 首位加成) * 敌补正 * (1 ± NP获得量BUFF) * 暴击补正 * Overkill补正
//
//       每一hit的受击NP获得公式：
// 受击NP率 * 敌补正 * (1 ± NP获得量BUFF) * (1 ± 受击NP获得量BUFF) * Overkill补正
      this.np += 10;
    }
    if (target.npType === 'process') {
      this.np += 10;
    }
    this.moveProcesses.forEach(t => {
      if (t.afterAttack) {
        t.afterAttack(this, target, moveCard);
      }
    });
    target.moveProcesses.forEach(t => {
      if (t.afterDefence) {
        t.afterDefence(target, this, moveCard);
      }
    });
  }

  useSkill (operation:{ usable:boolean, skill:SkillBase, test?:(...arg:any) => boolean }) {
    if (operation.usable) {
      if (operation.test && operation.test(this.scenes, this)) {
        const { skill } = operation;
        if (skill.state === 'normal') {
          if (skill.remainCooldown === 0) {
            skill.scenes = this.scenes
            skill.use();
            skill.remainCooldown = skill.cooldown;
          } else {
            console.log('技能还没冷却好');
          }
        } else {
          console.log('技能被封印');
        }
      } else {
        console.log('技能不可用');
      }
    } else {
      console.log('你竟然使用了一个不可用的技能(=ﾟДﾟ=)');
    }
  }
}

