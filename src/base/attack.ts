// (ATK * 0.23 * ((指令卡伤害倍率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性)) + 首位加成) * 职阶补正 * 职阶克制 * 隐藏属性克制 * (1 ± 攻击力BUFF ∓ 防御力BUFF - 特防状态BUFF) * (1 + 暴击补正) * (1 + 特攻状态加成 ± 暴击威力BUFF * 暴击补正) * Extra攻击加成 * 指令卡Hit倍率 * 随机数) ± 伤害附加与减免 ∓ 被伤害减免与提升 + BusterChain加成
//指令卡伤害倍率,首位加成,隐藏属性克制,暴击补正，Extra攻击加成,BusterChain加成,随机数在生成前计算，常量。在攻击前，所有的值都有默认值
import { ActionType, CardType } from '@/base/enums';
import { ServantBase } from '@/base/servant';
import { classAttackPatch } from '@/base/formula';
import MoveCard from '@/base/moveCard';

export interface NormalAttack {
  //指令卡伤害倍率
  moveCardRate: number;
  //首位加成
  firstBonus: number;
  //隐藏属性克制
  hiddenStatus: number;
  //暴击补正
  isCritic: 0 | 1;
  //随机数
  random: number;
  //Extra攻击加成
  extraBonus: number;
  //指令卡颜色
  moveCardColor: CardType;
  //指令卡性能BUFF
  moveCardPerformance: number;
  //指令卡耐性
  moveCardEndurance: number;
  //职阶补正
  rankSupplement: number;
  //职阶克制
  rankRestraint: number;
  //攻击力BUFF
  attackPower: number;
  //防御力BUFF
  defencePower: number;
  //特防状态BUFF
  specialDefend: number;
  //特攻状态加成
  specialAttack: number;
  //暴击威力BUFF
  criticPower: number;
  //指令卡Hit倍率
  moveCardHitRate: number;
  //伤害值追加
  damageAppend: number;
  //被伤害值追加
  defenceAppend: number;
  //BusterChain加成
  busterChainBonus: number;
}

export interface AttackerNp {
  //NP率
  npRate: number;
  //指令卡补正
  moveCaredBonus: number;
  //指令卡性能BUFF
  moveCardPerformance: number;
  //指令卡耐性
  moveCardEndurance: number;
  //首位加成
  firstBonus: number;
  //敌补正,类型2的敌人持有targetBonus上升20%的隐藏buff
  targetBonus: number;
  //NP获得量BUFF
  NpBonus: number;
  //暴击补正
  isCritic: number;
  //Overkill补正
  overKillBonus: number;
}
//受击NP率 * 敌补正 * (1 ± NP获得量BUFF) * (1 ± 受击NP获得量BUFF) * Overkill补正
export interface DefenderNp {
  defenceNpRate: number;
  attackerNpBonus: number;
  npBuff: number;
  defenceNpBonus: number;
  overKillBonus: number;
}

//从者掉星率 + 指令卡掉星率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性) + 首位加成 + 敌补正 ± 掉星率BUFF ± 敌人掉星率BUFF + 暴击补正 + Overkill补正
export interface StarBonus {
  servantStarDropRate: number;
  moveCardStarDropRate: number;
  moveCardPerformance: number;
  moveCardEndurance: number;
  firstBonus: number;
  targetBonus: number;
  starDropRateBuff: number;
  targetStarDropRateBuff: number;
  isCritic: number;
  overKillBonus: number;
}

//(ATK * 0.23 * 宝具伤害倍率 * 指令卡伤害倍率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性) * 职阶补正 * 职阶克制 * 隐藏属性克制 * (1 ± 攻击力BUFF ∓ 防御力BUFF - 特防状态BUFF) * (1 + 特攻状态加成 ± 宝具威力BUFF) * 宝具特攻倍率 * 随机数) ± 伤害附加与减免 ∓ 被伤害减免与提升

export interface NobelAttack{
  nobleRate:number;
  moveCardRate:number;
  moveCardPerformance:number;
  moveCardEndurance:number;
  rankSupplement:number;
  rankRestraint:number;
  hiddenStatus:number;
  attackPower:number;
  defencePower: number;
  specialDefend: number;
  specialAttack:number;
  noblePower:number;
  nobleSpecialAttack:number;
  random:number;
  damageAppend: number;
  defenceAppend: number
}


//最后还是决定将攻击作为一个实例处理了，不然对多个目标的攻击不好计算
//特攻类buff暂时为返回一个函数，在handle里一直返回false，在返回的函数内处理timer和remove
class Attack{
  moveCardRate: number;
  rankSupplement:number;
  attackPower: number;
  random:number;
  moveCardPerformance: number;
  criticPower: number;
  moveCardHitRate: number;
  damageAppend: number;
  constructor (servant:ServantBase,card:MoveCard,cardPosition:number) {
    this. moveCardRate=cardPosition === 3
      ? 1
      : card.basePowerRate * (1 + 0.2 * cardPosition);
    this.rankSupplement = classAttackPatch(servant.servantClass);
    this.attackPower = Math.max(-100,Math.min(500,servant.buffStack.handle({actionType:ActionType.attack,attackPower:0}).attackPower));
    this.random = 0.9 + Math.random() * 0.2
    this.moveCardPerformance = Math.max(-100,Math.min(500,servant.buffStack.handle({actionType:ActionType.attack,moveCardPerformance:0}).moveCardPerformance))
    this.criticPower = Math.max(-100,Math.min(500,servant.buffStack.handle({actionType:ActionType.attack,criticPower:0}).criticPower))
    this.moveCardHitRate = card.hitsRate
    this.damageAppend =servant.buffStack.handle({actionType:ActionType.attack,damageAppend:0}).damageAppend
  }
}
