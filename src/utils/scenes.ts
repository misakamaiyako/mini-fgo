import { MoveCard, ServantBase } from '@/utils/servant';

export default class Scenes {
  standbyServant:Array<ServantBase> = [];
  standbyEnemy:Array<ServantBase> = [];
  diedServant:Array<ServantBase> = [];
  diedEnemy:Array<ServantBase> = [];
  activeServant:Array<ServantBase> = [];
  activeEnemy:Array<ServantBase> = [];
  moveCardsPool:Array<MoveCard> = [];

  winOrLose () {
    if (this.activeEnemy.length === 0) {
      alert('you win!');
    } else if (this.activeServant.length === 0) {
      alert('you lose!');
    }
  }

  roundStart () {
    this.activeServant.forEach(t => {
      t.moveProcesses.forEach(g => {
        if (g.roundEnd) {
          g.roundEnd(this.activeServant, this.activeEnemy);
        }
      });
    });
    this.activeEnemy.forEach(t => {
      t.moveProcesses.forEach(g => {
        if (g.roundEnd) {
          g.roundEnd(this.activeEnemy, this.activeServant);
        }
      });
    });
    this.getMoveCards();
    this.distributionCritStar();
  }

  roundEnd () {
    [ [ this.activeServant, this.activeEnemy ], [ this.activeEnemy, this.activeServant ] ].forEach(([ attacker, defender ], index) => {
      attacker.forEach((t, index) => {
        if (t.hp > 0) {
          t.moveProcesses.forEach(g => {
            if (g.roundEnd) {
              g.roundEnd(attacker, defender);
            }
          });
        } else {
          t.moveProcesses.forEach(g => {
            if (g.death) {
              g.death(attacker, defender);
            }
          });
          if (index === 0) {
            this.activeServant.forEach(t => {
              t.MoveCard.forEach(g => {
                g.state = 'pool';
              });
            });
            this.diedServant.push(this.activeServant.splice(index, 1)[ 0 ]);
            if (this.standbyServant.length > 0) {
              this.activeServant.splice(index, 0, <ServantBase>this.standbyServant.shift());
            }
          } else {
            this.diedEnemy.push(this.activeEnemy.splice(index, 1)[ 0 ]);
            if (this.standbyEnemy.length > 0) {
              this.activeEnemy.splice(index, 0, <ServantBase>this.standbyEnemy.shift());
            }
          }
        }
      });
    });
    this.winOrLose();
  }

  getMoveCards () {
    let pool:MoveCard[] = [];
    this.activeServant.forEach(t => {
      t.MoveCard.forEach(g => {
        if (g.state === 'pool') {
          pool.push(g);
          g.state = 'active';
        }
      });
    });
    if (pool.length === 0) {
      this.activeServant.forEach(t => {
        t.MoveCard.forEach(g => {
          g.state = 'pool';
        });
      });
      this.getMoveCards();
    } else {
      this.moveCardsPool = pool;
    }
  }

  distributionCritStar () {

  }
}
