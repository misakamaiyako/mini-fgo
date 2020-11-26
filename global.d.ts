import { ServantBase } from '@/base/servant';
import { ActionType, BuffEffect, BuffType } from '@/base/enums';

declare global {
  interface Skill {
    selfId:number;
    name:string;
    leave:number;
    coolDown:number;
    effect:(servant:ServantBase) => void;
  }


  type hiddenCharacteristic = 'god' | 'legend' | 'human' | 'star' | 'beast';

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
