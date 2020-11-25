import { ServantBase } from '@/base/servant';
import MoveCard from '@/base/moveCard';

declare global {
  interface Skill {
    selfId:number;
    name:string;
    leave:number;
    coolDown:number;
    effect:(servant:ServantBase) => void;
  }


  type hiddenCharacteristic = 'god' | 'legend' | 'human' | 'star' | 'beast';
  // type moveCardColor = 'buster' | 'quick' | 'art' | 'extra'

  type scenes =
    | 'attack'
    | 'defend'
    | 'afterAttack'
    | 'afterDefend'
    | 'death'
    | 'roundStart'
    | 'roundEnd';

  interface MoveProcess {
    id:symbol;
    beforeAttack?:(
      attacker:ServantBase,
      defender?:ServantBase,
      moveCard?:MoveCard,
    ) => number; //攻击前生效
    beforeDefence?:(
      defender:ServantBase,
      attacker?:ServantBase,
      moveCard?:MoveCard,
    ) => number; //防御前生效
    onAttack?:(
      attacker:ServantBase,
      defender?:ServantBase,
      moveCard?:MoveCard,
    ) => number; //攻击时生效，主要用于处理特攻
    onDefence?:(
      defender:ServantBase,
      attacker?:ServantBase,
      moveCard?:MoveCard,
    ) => { base:number; attach:number }; //防御时生效，主要用于处理特防 防御力，特防
    afterAttack?:(
      attacker:ServantBase,
      defender?:ServantBase,
      moveCard?:MoveCard,
    ) => number;
    afterDefence?:(
      defender:ServantBase,
      attacker?:ServantBase,
      moveCard?:MoveCard,
    ) => number;
    death?:(friends:Array<ServantBase>, enemy:Array<ServantBase>) => number;
    roundStart?:(
      friends:Array<ServantBase>,
      enemy:Array<ServantBase>,
    ) => number;
    attackEnd?:(
      friends:Array<ServantBase>,
      enemy:Array<ServantBase>,
    ) => number;
    roundEnd?:(
      friends:Array<ServantBase>,
      enemy:Array<ServantBase>,
    ) => number;
    timer?:number; //计时器，如果一个效果有多个计时器的话，其它的计时器的效果设置为空
  }

  type cardInit = { fufu:number; CommanderCardId?:number };

  type characteristic =
    | 'ride'
    | 'dragon'
    | 'altriaFace'
    | 'godAndLegend'
    | 'arthur'
    | 'king'
    | 'human';

  interface Buff {
    id:Symbol;
    buffType:BuffType;
    buffEffect:BuffEffect;
    timer:{
      times:number;
      round:number;
    };
    description:() => string;
    shouldRemove:boolean;
    remove:(removePower:number) => boolean;
    activeRate:number; //buff有效的几率，大部分为情况1
    handle:(value:{ actionType:ActionType; [ args:string ]:any }) => boolean; //对象处理，必须在开始前判断类型,返回值表示是否对操作生效了
  }
}
