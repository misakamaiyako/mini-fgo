import Noble from '@/base/noble';
import { NobleAttack } from '@/factory/actions';
import { ServantBase } from '@/base/servant';
import '@/base/enums'

export default class EXcalibar extends Noble {
  name = '誓约胜利之剑';
  cardType = CardType.buster;
  nobleType = NobleType.allTarget;
  valueArray = [ [ 4, 5, 5.5, 5.75, 6 ], [ 0.2, 0.275, .35, .425, 0.5 ] ];
  actions = [
    () => {
      if (this.owner.scenes?.activeEnemy) {
        NobleAttack(this, this.npRate, this.owner, this.owner.scenes.activeEnemy);
      }
    },
    () => {
      this.owner.np = this.owner.np + this.valueArray[ 1 ][ this.overCharge - 1];
    },
  ];
  npRate = 0.86;
  hitsChain:Array<number> = [ 100 ];

  constructor (leave:number, owner:ServantBase, npRate:number, hitsChain:Array<number>) {
    super(leave, owner, CardType.buster, npRate, hitsChain);
  }
}
