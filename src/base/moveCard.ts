import { ServantBase } from '@/base/servant';

/**
 * @description 指令卡类
 */
export default abstract class MoveCard {
  /**
   * @description 颜色
   */
  abstract cardType:CardType;

  /**
   * @description 攻击倍率
   */
  get basePowerRate () {
    switch (this.cardType) {
      case CardType.buster:
        return 1.5;
      case CardType.quick:
        return 0.8;
      case CardType.art:
        return 1;
      default:
        return 0.625;
    }
  }

  /**
   * @description np率
   */
  abstract npRate:number;
  /**
   * @description 芙芙攻击
   */
  fufuAttack:number = 0;
  /**
   * @description 集星率
   */
  starRate:number = 0;

  /**
   * @description 暴击几率，己方为星星数，敌方为固定值
   */
  criticRate:number = 0;

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
  abstract hitsChain:Array<number> ;
  owner:ServantBase;

  protected constructor (value:{ fufuAttack?:number, CommanderCardId?:number,owner:ServantBase }) {
    this.owner = value.owner
    if (value.fufuAttack) {
      this.fufuAttack = value.fufuAttack;
    }
    if (value.CommanderCardId) {
      this.commanderCard = new CommanderCard(value.CommanderCardId, this);
    }
  }

}
/**
 * @description 指令纹章
 */
class CommanderCard {
  constructor (id:number, moveCard:MoveCard) {
  }
}
