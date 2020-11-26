export enum ServantClass {
  saber,
  archer,
  lancer,
  rider,
  caster,
  assassin,
  berserker,
  ruler,
  avenger,
  alterego,
  moonCancer,
  foreigner,
  shielder,
  beast1,
  beast2,
  beast3L,
  beast3R,
  beastUnknown,
}

export enum BuffType {
  strengthen,
  weaken,
  notDuality,
}

export enum AttackBuffEffect {
  attack = 100, //攻击
  moveCardPerformance, //指令卡性能
  specialAttack, //特攻
  damageAttach, //伤害附加
  moveCardAttack, //指令卡威力
  criticalPower, //暴击伤害
  criticalChance, //暴击率
  noblePower, //宝具伤害
  ignoreAvoid, //必中
  ignoreInvincible, //无敌贯通
  ignoreDefence, //无视防御
}

export enum defenceBuffEffect {
  defence = 200, //防御
  defenceAttach, //防御附加
  specialDefence, //特防
  moveCardEndurance, //色卡耐性
  avoid, //闪避
  invincible, //无敌
  againstPurge, //对肃正防御
  toughness, //韧性
}

export enum Critical {
  concentrated = 300, //暴击星集中
  drop, //暴击星掉落率
  gain, //获得暴击星
}

export enum NPState {
  gainRate = 400, //np率
  gainRateOnTurnEnd, //回合结束时np获得
  gainRateOnGetHit, //受击np率
}

export enum HPState {
  recoverCoefficient = 500, //恢复系数
  recoverByTurnEnd, //回合结束时恢复
  maxHP, //最大生命值变化
}

export enum AdditionalEffect {
  afterAttack = 600,
}

export enum OtherEffect {
  targetConcentrated = 700, //目标集中
  statusSetChance, //状态赋予成功率
  specialEndurance, //特殊耐性
  weakenEndurance, //弱化耐性
  noStrengthen, //强化无效
  noWeaken, //弱化无效
  strengthenRemoveEndurance, //强化解除耐性
  weakenRemoveEndurance, //弱体解除耐性
  beCriticalChance, //被暴击率
  dieChance, //即死成功率
  dieEndurance, //即死抗性
  maxDieEndurance, //即死抗性满（不能即死）
  mentalDisorder, //精神类异常
  dot, //dot类伤害
  delayed, //延迟效果
  others,
}

export enum OtherEffect2 {
  others = 800,
}

export enum BuffEffect {
  AttackBuffEffect,
  defenceBuffEffect,
  Critical,
  NPState,
  HPState,
  AdditionalEffect,
  OtherEffect,
  OtherEffect2,
}

export enum ActionType {
  gameStart, //游戏开始
  approach, //登场
  drawCard, //抽卡
  dispatchStar, //分发暴击星
  starCountChange, //暴击星变化
  gaveStrengthen, //给强化
  beStrengthen, //被强化
  weaken, //弱化
  beWeaken, //被弱化
  heal, //治疗
  charge, //充能
  attackerBonusNp, //攻击者np
  defenderBonusNp, //防御者np
  attack, //攻击
  calculateStar, //计算指令卡攻击暴击星
  afterAttack, //攻击后
  noble, //宝具
  overCharge, //宝具阶段提升(应该放在noble里，但是暂时想不出什么方法处理伤害计算和overcharge计算)
  beNoble, //被宝具攻击
  defence, //防御
  afterDefence, //防御后
  roundEnd, //回合结束
  roundStart, //回合开始
  death, //角色战败
  defeated, //玩家战败
  defeat, //玩家胜利
}

export enum StrengthenType {
  attack,
  defence,
}

export enum CardType {
  buster,
  art,
  quick,
  extra,
}

export enum NobleType {
  allTarget,
  single,
  support,
}

export enum ChainType {
  buster,
  quick,
  art,
  none,
}

export enum PanelPropertiesUniversal {
  EX,
  'A++',
  'A+',
  A,
  'A-',
  'B++',
  'B+',
  B,
  'C++',
  'C+',
  C,
  'C-',
  'D++',
  'D+',
  D,
  'E+',
  E,
}

export enum Rare {
  blank, U, UR, R, SR, SSR
}
