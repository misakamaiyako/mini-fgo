import { ServantBase } from '@/base/servant';
import MoveCard from '@/base/moveCard';

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

  protected constructor (leave:number, owner:ServantBase,cardType:CardType,npRate:number,hitsChain:Array<number>) {
    super(cardType,npRate,hitsChain,owner);
    this.leave = leave;
  }
}
