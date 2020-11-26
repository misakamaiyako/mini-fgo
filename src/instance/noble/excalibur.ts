import Noble from '@/base/noble';
import { NobleAttack } from '@/factory/actions';
import { ServantBase } from '@/base/servant';
import { CardType, NobleType } from '@/base/enums';

export default class EXcalibar extends Noble {
  name = '誓约胜利之剑';
  cardType = CardType.buster;
  nobleType = NobleType.allTarget;
  valueArray = [ [ 4, 5, 5.5, 5.75, 6 ], [ 20, 27.5, 35, 42.5, 50 ] ];
  actions = [
    () => {
      if (this.owner.scenes?.activeEnemy) {
        NobleAttack(this, this.valueArray[ 0 ][ this.leave -1], this.owner, this.owner.getOpposite());
      }
    },
    () => {
      this.owner.addNp(this.valueArray[ 1 ][ this.overCharge - 1 ]);
    },
  ];
  npRate = 0.86;
  hitsChain:Array<number> = [ 100 ];

  constructor (leave:number, owner:ServantBase, npRate:number, hitsChain:Array<number>) {
    super(leave, owner, CardType.buster, npRate, hitsChain);
  }
}
