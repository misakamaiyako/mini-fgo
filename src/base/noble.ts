import { ServantBase } from '@/base/servant';
import MoveCard from '@/base/moveCard';
import { ActionType, CardType, NobleType } from '@/base/enums';

export default abstract class Noble extends MoveCard {
  abstract name:string;
  abstract nobleType:NobleType;
  abstract valueArray:Array<Array<number>>;
  leave:number;
  abstract actions:Array<() => void>;
  readonly fufuAttack = 0;
  readonly starRate = 0;
  readonly criticRate = 0;
  readonly commanderCard = undefined;
  overCharge:number = 0;

  protected constructor (leave:number, owner:ServantBase, cardType:CardType, npRate:number, hitsChain:Array<number>) {
    super(cardType, npRate, hitsChain, owner);
    this.leave = leave;
  }

  active (overCharge:number) {
    this.owner.buffStack.handle({ actionType: ActionType.overCharge, noble: this });
    this.overCharge = Math.min(overCharge + this.overCharge + (this.owner.npType === 'process' ? (this.owner.np / 100) | 0 : 1), 5);
    this.owner.np = 0;
    this.actions.forEach(fun => {
      fun();
    });
  }
}
