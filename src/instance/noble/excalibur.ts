import Noble from '@/base/noble';
import { moveCardPerformance } from '@/factory/actions';

class EXcalibar extends Noble {
  name = '誓约胜利之剑';
  cardType = CardType.buster;
  nobleType = NobleType.allTarget;
  valueArray = [ [ 4, 5, 5.5, 5.75, 6 ], [ 0.2, 0.275, .35, .425, 0.5 ] ];
  actions = [
    moveCardPerformance([ {
      color: CardType.buster,
      activeRate: 1,
      buffType: BuffType.strengthen,
      times: Infinity,
      round: 1,
      value: 0.5,
    } ]).bind(this),
  ];
  npRate = 0.86;
  hitsChain:Array<number> = [ 100 ];
}
