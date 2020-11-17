import { ServantBase } from '@/base/servant';
import MoveCard from '@/base/moveCard';

declare global {
  interface Skill {
    selfId:number,
    name:string,
    leave:number,
    coolDown:number,
    effect:(servant:ServantBase) => void
  }

  type ServantClass =
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
  type hiddenCharacteristic = 'god' | 'legend' | 'human' | 'star'
  // type moveCardColor = 'buster' | 'quick' | 'art' | 'extra'

  type scenes = 'attack' | 'defend' | 'afterAttack' | 'afterDefend' | 'death' | 'roundStart' | 'roundEnd'

  interface MoveProcess {
    id:symbol,
    beforeAttack?:(attacker:ServantBase, defender?:ServantBase, moveCard?:MoveCard) => number,//攻击前生效
    beforeDefence?:(defender:ServantBase, attacker?:ServantBase, moveCard?:MoveCard) => number,//防御前生效
    onAttack?:(attacker:ServantBase, defender?:ServantBase, moveCard?:MoveCard) => number,//攻击时生效，主要用于处理特攻
    onDefence?:(defender:ServantBase, attacker?:ServantBase, moveCard?:MoveCard) => { base:number, attach:number },//防御时生效，主要用于处理特防 防御力，特防
    afterAttack?:(attacker:ServantBase, defender?:ServantBase, moveCard?:MoveCard) => number,
    afterDefence?:(defender:ServantBase, attacker?:ServantBase, moveCard?:MoveCard) => number,
    death?:(friends:Array<ServantBase>, enemy:Array<ServantBase>) => number,
    roundStart?:(friends:Array<ServantBase>, enemy:Array<ServantBase>) => number,
    attackEnd?:(friends:Array<ServantBase>, enemy:Array<ServantBase>) => number,
    roundEnd?:(friends:Array<ServantBase>, enemy:Array<ServantBase>) => number,
    timer?:number//计时器，如果一个效果有多个计时器的话，其它的计时器的效果设置为空
  }

  type cardInit = { fufu:number, CommanderCardId?:number }

  type characteristic = 'ride' | 'dragon' | 'altriaFace' | 'godAndLegend' | 'arthur' | 'king' | 'human'

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

  enum ActionType {
    gameStart,//游戏开始
    approach,//登场
    drawCard,//抽卡
    dispatchStar,//分发暴击星
    starCountChange,//暴击星变化
    strengthen,//强化
    weaken,//弱化
    heal,//治疗
    charge,//充能
    attackerBonusNp,//攻击者np
    defenderBonusNp,//防御者np
    attack,//攻击
    afterAttack,//攻击
    noble,//宝具
    defence,//防御
    afterDefence,//防御
    roundEnd,//回合结束
    death,//角色战败
    defeated,//玩家战败
    defeat,//玩家胜利
  }
  enum StrengthenType {
    attack,
    defence
  }
  enum CardType {
    buster,
    art,
    quick,
    extra
  }

  enum NobleType {
    allTarget,
    single,
    support
  }
}


