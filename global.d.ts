import { ServantBase } from '@/base/servant';
import { ActionType, BuffEffect, BuffType } from '@/base/enums';

declare global {
  abstract class SkillBase {
    abstract name: string;
    abstract originColdDown: number;
    abstract actions: Array<() => void>;
    abstract icon: string;
    abstract description: string;
    abstract effectValue: Array<number>;
    abstract withStrength: boolean;
    abstract withWeaken: boolean;
    leave: number;
    get maxColdDown():number;
    coolDown: number;
    owner: ServantBase;
    get useCondition(): boolean;
    protected constructor(data: {
      leave: number;
      owner: ServantBase;
    });
    use(): false | void;
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
  interface DefenceInstance{
    hiddenStatus:number,
    rankRestraintFun: Array<number>,
    moveCardEndurance: number,
    specialDefend: number,
    defencePower: number,
    defenceAppend: number,
    evasion: boolean,//回避
    invincibility: boolean,//无敌
    solemnDefence: boolean,//对肃正防御
    criticRateDown: number
  }
}
