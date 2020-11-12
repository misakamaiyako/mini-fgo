import { MoveCard, ServantBase } from '@/base/servant';
declare global{
  interface Skill {
    selfId:number,
    name:string,
    leave:number,
    coolDown:number,
    effect:(servant:ServantBase)=>void
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
  type hiddenCharacteristic = 'god'|'legend'|'human'|"star"
  type moveCardColor = 'buster' | 'quick' | 'art' | 'extra'

  type scenes = 'attack'|'defend'|'afterAttack'|'afterDefend'|'death'|'roundStart'|'roundEnd'

  interface MoveProcess {
    id:symbol,
    beforeAttack?:(attacker:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>number,//攻击前生效
    beforeDefence?:(defender:ServantBase,attacker?:ServantBase,moveCard?:MoveCard)=>number,//防御前生效
    onAttack?:(attacker:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>number,//攻击时生效，主要用于处理特攻
    onDefence?:(defender:ServantBase,attacker?:ServantBase,moveCard?:MoveCard)=>{base:number,attach:number},//防御时生效，主要用于处理特防 防御力，特防
    afterAttack?:(attacker:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>number,
    afterDefence?:(defender:ServantBase,attacker?:ServantBase,moveCard?:MoveCard)=>number,
    death?:(friends:Array<ServantBase>,enemy:Array<ServantBase>)=>number,
    roundStart?:(friends:Array<ServantBase>,enemy:Array<ServantBase>)=>number,
    attackEnd?:(friends:Array<ServantBase>,enemy:Array<ServantBase>)=>number,
    roundEnd?:(friends:Array<ServantBase>,enemy:Array<ServantBase>)=>number,
    timer?:number//计时器，如果一个效果有多个计时器的话，其它的计时器的效果设置为空
  }
  type cardInit = {fufu:number,CommanderCardId?:number}

  type characteristic = 'ride'|'dragon'|'altriaFace'|'godAndLegend'|'arthur'|'king'|'human'
  interface Buff {
    text:string,
    affix?:string,
    type:'attack'|'defend'|'other',//buff 类型，攻击强化，防御强化，其它
    canRemove:boolean,
    id:symbol,
    remove:(removePower?:number)=>boolean
  }
  type EffectType = 'attack' | 'defence' | 'np' | 'weak'

  interface Counter {
    times?:number,
    round?:number
  }
}


