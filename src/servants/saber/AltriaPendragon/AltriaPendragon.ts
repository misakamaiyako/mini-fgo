import { ServantBase } from '@/base/servant';
import Noble from '@/base/noble';
import MoveCard from '@/base/moveCard';
import EXcalibar from '@/instance/noble/excalibur';
import growth from '@/servants/saber/AltriaPendragon/growth';

export class AltriaPendragonSaber extends ServantBase {
  MoveCard:Array<MoveCard> = [];
  characteristic:Set<characteristic> = new Set([ 'ride', 'dragon', 'altriaFace', 'godAndLegend', 'arthur', 'king', 'human' ]);
  hiddenCharacteristic:hiddenCharacteristic = 'legend';
  id = 2;
  name = '阿尔托莉雅·潘德拉贡';
  npRate = 0.03;
  positiveSkill:Array<Skill> = [];
  servantClass = ServantClass.saber;
  skills:Array<Skill> = [];
  useDefaultHPLine:boolean = true;
  noble:Noble;

  constructor (data:{ noble:{ leave:number; }; }) {
    super();
    let cards = AltriaPendragonCards();
    let card;
    while ((card = cards.next()) && !card.done) {
      this.MoveCard.push(new MoveCard(card.value.cardType, card.value.npRate, card.value.hitsChain, this));
    }
    this.noble = new EXcalibar(data.noble.leave, this, 0.86, [ 100 ]);
    if (data.useDefault) {
      const { atk, hp } = growth(data.leave);
      this.baseAttack = atk;
      this.baseHp = hp;
    } else {
      this.baseAttack = data.status.atk;
      this.baseHp = data.status.hp;
    }
  }

  starDropRate:number = 0.1;
  baseAttack:number;
  baseHp:number;
  deathRate:number;
}

//
function* AltriaPendragonCards ():Generator<{ npRate:number; cardType:CardType; hitsChain:number[] }, void, unknown> {
  yield { cardType: CardType.quick, npRate: 0.86, hitsChain: [ 33, 67 ] };
  yield { cardType: CardType.art, npRate: 0.86, hitsChain: [ 33, 67 ] };
  yield { cardType: CardType.art, npRate: 0.86, hitsChain: [ 33, 67 ] };
  yield { cardType: CardType.buster, npRate: 0.86, hitsChain: [ 100 ] };
  yield { cardType: CardType.buster, npRate: 0.86, hitsChain: [ 100 ] };
  yield { cardType: CardType.extra, npRate: 0.86, hitsChain: [ 33, 67 ] };
}
