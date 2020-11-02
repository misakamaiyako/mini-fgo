import { MoveCard, ServantBase } from '@/utils/servant';

export class AltriaPendragonSaber extends ServantBase {
  constructor (props:{ baseMaxHp:number; atk:number; nobleLeave:number; }, cards:cardInit[]) {
    super(props);
    if (cards.length !== 5) {
      throw new RangeError('every servant need five move card!');
    } else {
      this.MoveCard = [
        new AltriaPendragonSaberQuickCard(cards[ 0 ].fufu, cards[ 0 ].CommanderCardId),
        new AltriaPendragonSaberArtCard(cards[ 1 ].fufu, cards[ 1 ].CommanderCardId),
        new AltriaPendragonSaberArtCard(cards[ 2 ].fufu, cards[ 2 ].CommanderCardId),
        new AltriaPendragonSaberBusterCard(cards[ 3 ].fufu, cards[ 3 ].CommanderCardId),
        new AltriaPendragonSaberBusterCard(cards[ 4 ].fufu, cards[ 4 ].CommanderCardId),
        new AltriaPendragonSaberExtraCard(),
      ];
    }
  }

  MoveCard:[ AltriaPendragonSaberQuickCard, AltriaPendragonSaberArtCard, AltriaPendragonSaberArtCard, AltriaPendragonSaberBusterCard, AltriaPendragonSaberBusterCard, AltriaPendragonSaberExtraCard ];
  characteristic:Set<characteristic> = new Set([ 'ride', 'dragon', 'altriaFace', 'godAndLegend', 'arthur', 'king', 'human' ]);
  hiddenCharacteristic:hiddenCharacteristic = 'legend';
  servantClass:ServantClass = 'saber';
  servantName:string = '阿尔托莉雅·潘德拉贡';
  hitNpRate:number = 3;
}

export class AltriaPendragonSaberBusterCard extends MoveCard {
  constructor (fufu:number = 0, CommanderCardId?:number) {
    super({ color: 'buster', npRate: 0.86, hitsChain: [ 100 ], CommanderCardId, fufuAttack: fufu });
  }
}

export class AltriaPendragonSaberQuickCard extends MoveCard {
  constructor (fufu:number = 0, CommanderCardId?:number) {
    super({ color: 'quick', npRate: 0.86, hitsChain: [ 33, 67 ], CommanderCardId, fufuAttack: fufu });
  }
}

export class AltriaPendragonSaberArtCard extends MoveCard {
  constructor (fufu:number = 0, CommanderCardId?:number) {
    super({ color: 'art', npRate: 0.86, hitsChain: [ 33, 67 ], CommanderCardId, fufuAttack: fufu });
  }
}

export class AltriaPendragonSaberExtraCard extends MoveCard {
  constructor () {
    super({ color: 'extra', npRate: 0.86, hitsChain: [ 33, 67 ] });
  }
}
