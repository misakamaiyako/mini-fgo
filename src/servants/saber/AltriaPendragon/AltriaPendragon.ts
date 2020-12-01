import { ServantBase } from '@/base/servant';
import Noble from '@/base/noble';
import EXcalibar from '@/instance/noble/excalibur';
import growth from '@/servants/saber/AltriaPendragon/growth';
import { CardType, Rare, ServantClass } from '@/base/enums';
import { LeaderShipB } from '@/instance/skills/streathen';

export default class AltriaPendragonSaber extends ServantBase {
  characteristic:Set<characteristic> = new Set([ 'ride', 'dragon', 'altriaFace', 'godAndLegend', 'arthur', 'king', 'human' ]);
  hiddenCharacteristic:hiddenCharacteristic = 'legend';
  id = 2;
  name = '阿尔托莉雅·潘德拉贡';
  npRate = 0.03;
  positiveSkill:Array<SkillBase> = [];
  servantClass = ServantClass.saber;
  skills:Array<SkillBase> = [];
  noble:Noble;
  rare = Rare.SSR;
  constructor (data: { fufu: { cards: number[]; atk: number; hp: number; }; commanderCardId: (number|undefined)[]; level: number; noble: { level: number; }; useDefault: boolean; status: { atk: number; hp: number; }; }) {
    super(
      AltriaPendragonCards.map((t,index)=>({
        ...t,
        fufu:data.fufu.cards[index],
        commanderCardId:data.commanderCardId[index]
      })),
      data.level
    );
    this.noble = new EXcalibar(data.noble.level, this, 0.86, [ 100 ]);
    if (data.useDefault) {
      const { atk, hp } = growth(data.level);
      this.baseAttack = atk;
      this.baseHp = hp;
      this.strengthenAttack = data.fufu.atk;
      this.strengthenHp = data.fufu.hp;
    } else {
      this.baseAttack = data.status.atk;
      this.baseHp = data.status.hp;
    }
    this.skills.push(new LeaderShipB({leave:10,owner:this}))
  }

  starDropRate:number = 0.1;
  baseAttack:number;
  baseHp:number;
  deathRate:number=0.21;
}

const AltriaPendragonCards = [
  { cardType: CardType.quick, npRate: 0.86, hitsChain: [ 33, 67 ] },
  { cardType: CardType.art, npRate: 0.86, hitsChain: [ 33, 67 ] },
  { cardType: CardType.art, npRate: 0.86, hitsChain: [ 33, 67 ] },
  { cardType: CardType.buster, npRate: 0.86, hitsChain: [ 100 ] },
  { cardType: CardType.buster, npRate: 0.86, hitsChain: [ 100 ] },
  { cardType: CardType.extra, npRate: 0.86, hitsChain: [ 12,25,63 ] }
  ];
