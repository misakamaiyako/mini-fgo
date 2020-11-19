import { ServantBase } from '@/base/servant';
import { SkillBase } from '@/base/skillDatabase';
import Noble from '@/base/noble';
import MoveCard from '@/base/moveCard';

export class AltriaPendragonSaber extends ServantBase{
  MoveCard:Array<MoveCard>;
  characteristic:Set<characteristic> = new Set([ 'ride', 'dragon', 'altriaFace', 'godAndLegend', 'arthur', 'king', 'human' ]);
  deathRate= 0.21;
  hiddenCharacteristic:hiddenCharacteristic= 'legend';
  id=2;
  name='阿尔托莉雅·潘德拉贡';
  npRate=0.03;
  positiveSkill:Array<Skill> =[];
  servantClass:ServantClass='saber';
  skills:Array<Skill> = [];
  useDefaultHPLine:boolean = true;
  baseHp:number;
  noble:Noble;
  constructor (data:unknown) {
    super();
    let cards = AltriaPendragonCards()
    this.MoveCard = data.moveCard.forEach(t=>{
      // @ts-ignore
      return new MoveCard(...cards.next().value)
    })
  }
}
//
function* AltriaPendragonCards (){
  yield {cardType:CardType.quick,npRate:0.86,hitsChain:[33,67]};
  yield {cardType:CardType.art,npRate:0.86,hitsChain:[33,67]};
  yield {cardType:CardType.art,npRate:0.86,hitsChain:[33,67]};
  yield {cardType:CardType.buster,npRate:0.86,hitsChain:[100]};
  yield {cardType:CardType.buster,npRate:0.86,hitsChain:[100]};
  yield {cardType:CardType.extra,npRate:0.86,hitsChain:[33,67]};
}
