import { MoveCard, ServantBase } from '@/utils/servant';

export default abstract class Scenes {
  standbyServant:Array<ServantBase | null>;
  abstract standbyEnemy:Array<ServantBase>;
  diedServant:Array<ServantBase> = [];
  diedEnemy:Array<ServantBase> = [];
  activeServant:Array<ServantBase> = [];
  activeEnemy:Array<ServantBase> = [];
  /**
   * @description 洗好的指令卡
   */
  moveCardsPool:Array<MoveCard> = [];

  /**
   * @description 当前回合的指令卡
   */
  get availableMoveCard ():Array<MoveCard> {
    let chunk:Array<MoveCard> = [];
    let pin:number = 0;
    while (chunk.length !== 5 && pin < this.moveCardsPool.length - 1) {
      if (this.moveCardsPool[ pin ].state === 'pool') {
        chunk.push(this.moveCardsPool[ pin ]);
      }
      pin++;
    }
    return chunk;
  }

  #critStar:number = 0;

  get critStar(){
    return this.#critStar
  }

  set critStar(value){
    this.#critStar+=value;
    if (this.#critStar<0){
      this.#critStar=0
    }
    this.distributionCritStar()
  }

  protected constructor (props:Array<ServantBase | null>) {
    if (this.checkTeam(props)) {
      this.activeServant = props.slice(0, 2) as Array<ServantBase>;
      this.standbyServant = props.slice(3, 5);
    } else {
      throw new Error('你的编队不符合要求');
    }
  }

  checkTeam (servants:Array<ServantBase | null>):boolean {
    return Boolean(servants[ 0 ] && servants[ 1 ] && servants[ 1 ]);
  }

  winOrLose () {
    if (this.win()) {
      alert('you win!');
    } else if (this.lose()) {
      alert('you lose!');
    }
  }

  win () {
    return this.activeEnemy.length === 0;
  }

  lose () {
    return this.activeServant.length === 0;
  }

  /**
   * @description 回合开始后，抽取指令卡前
   */
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
    this.shuffle();
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

  /**
   * @description 洗指令卡
   * @param flag 为true时为强制洗牌
   */
  shuffle (flag:boolean = false) {
    if (this.availableMoveCard.length === 0 || flag) {
      let pool:MoveCard[] = [];
      this.activeServant.forEach(t => {
        t.MoveCard.forEach(g => {
          g.state = 'pool';
          pool.push(g);
        });
      });
      this.moveCardsPool = pool;
    }
  }

  /**
   * @description 分发暴击星
   * @param flag 是否需要重新分配随机星权
   */
  distributionCritStar (flag=true) {
    if (this.critStar===0){
      if (flag){
        let [ card1, card2, card3, card4, card5 ] = shuffle([ 50, 20, 20, 0, 0 ]);
        this.availableMoveCard[0].randomCriticStarRate=card1;
        this.availableMoveCard[1].randomCriticStarRate=card2;
        this.availableMoveCard[2].randomCriticStarRate=card3;
        this.availableMoveCard[3].randomCriticStarRate=card4;
        this.availableMoveCard[4].randomCriticStarRate=card5;
      }
      let card1Max:number=this.availableMoveCard[0].criticRate
      let card2Max:number=0
      let card3Max:number=0
      let card4Max:number=0
      let card5Max:number=0
    }
  }
}

function shuffle<T> (array:Array<T>):Array<T> {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIdx = Math.floor(Math.random() * (i + 1));
    const itemAtIdx = array[ randomIdx ];
    array[ randomIdx ] = array[ i ];
    array[ i ] = itemAtIdx;
  }
  return array;
}
