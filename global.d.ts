import { MoveCard, ServantBase } from '@/utils/servant';
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

  type scenes = 'attack'|'defend'|'death'|'roundStart'|'roundEnd'

  interface MoveProcess {
    id:symbol,
    beforeAttack?:(attacker:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>number,//攻击前生效
    beforeDefence?:(defender:ServantBase,attacker?:ServantBase,moveCard?:MoveCard)=>number,//防御前生效
    onAttack?:(attacker:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>number,//攻击时生效，主要用于处理特攻
    onDefence?:(defender:ServantBase,attacker?:ServantBase,moveCard?:MoveCard)=>number,//防御时生效，主要用于处理特防
    afterAttack?:(attacker:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>number,
    afterDefence?:(defender:ServantBase,attacker?:ServantBase,moveCard?:MoveCard)=>number,
    test:(scenes:scenes,attacker?:ServantBase,defender?:ServantBase,moveCard?:MoveCard)=>boolean
  }
}


