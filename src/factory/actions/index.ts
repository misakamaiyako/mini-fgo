import Noble from '@/base/noble';
import MoveCard from '@/base/moveCard';
import { ServantBase } from '@/base/servant';
import { AttackerNp, NormalAttack } from '@/base/attack';
import { calculationNormalDamage, classAttackPatch, hiddenCharacteristicRestraint, restraint } from '@/base/base';

interface MoveCardPerformanceParams {
  color:CardType,
  activeRate:number,
  buffType:BuffType,
  round:number,
  times:number,
  value:number
}

export function moveCardPerformance (value:Array<MoveCardPerformanceParams>):() => void {
  return function(this:Noble) {
    let buffs:Array<Buff> = [];
    value.forEach(t => {
      const id = Symbol(t.color);
      let buff:Buff = {
        activeRate: t.activeRate,
        buffEffect: AttackBuffEffect.moveCardPerformance,
        buffType: t.buffType,
        description ():string {
          return t.color + (t.buffType === BuffType.strengthen ? '提升' : '下降');
        },
        handle (value:{ actionType:ActionType; [ p:string ]:any }):boolean {
          if (value.actionType === ActionType.attack || value.actionType === ActionType.noble) {
            if ((value.attackParams as NormalAttack).moveCardColor === t.color) {
              (value.attackParams as NormalAttack).moveCardPerformance += t.value;
              return true;
            }
          }
          return false;
        },
        id,
        remove: (removePower:number):boolean => {
          if (removePower > Math.random()) {
            let index = this.owner.buffStack.stack.findIndex(t => t.id === id);
            this.owner.buffStack.stack.splice(index, 1);
            return true;
          }
          return false;
        },
        get shouldRemove () {
          return this.timer.round === 0 || this.timer.times === 0;
        },
        timer: { round: t.round, times: t.times },
      };
      buffs.push(buff);
    });
    this.owner.buffStack.handle({ actionType: ActionType.strengthen, buffs });
    buffs.forEach(buff => {
      if (buff.activeRate === -Infinity) {
        console.log('无效');
      } else if (buff.activeRate > Math.random()) {
        this.owner.buffStack.stack.push(buff);
      } else {
        console.log('miss');
      }
    });
  };
}

export function attack (moveCard:MoveCard, attacker:ServantBase, defender:ServantBase) {
  let attackInstance:NormalAttack = {
    attackPower: 0,
    busterChainBonus: 0,
    criticPower: 0,
    damageAppend: 0,
    defenceAppend: 0,
    defencePower: 0,
    extraBonus: 0,
    firstBonus: 0,
    hiddenStatus: hiddenCharacteristicRestraint(attacker.hiddenCharacteristic, defender.hiddenCharacteristic),
    isCritic: Math.random() < moveCard.criticRate ? 1 : 0,
    moveCardColor: moveCard.cardType,
    moveCardEndurance: 0,
    moveCardHitRate: moveCard.hitsRate,
    moveCardPerformance: 0,
    moveCardRate: moveCard.basePowerRate,
    random: (0.9 + Math.random() * 0.2),
    rankRestraint: restraint(attacker.servantClass, defender.servantClass),
    rankSupplement: classAttackPatch(attacker.servantClass),
    specialAttack: 0,
    specialDefend: 0,
  };
  let attackerNpInstance:AttackerNp={
    NpBonus: 0,
    firstBonus: 0,
    isCritic: 1,
    moveCardEndurance: 0,
    moveCardPerformance: 0,
    moveCaredBonus: 0,
    npRate: 0,
    overKillBonus: 0,
    targetBonus: 0
  }
  attacker.buffStack.handle({actionType:ActionType.attack,attackInstance})
  defender.buffStack.handle({actionType:ActionType.defence,attackInstance})
  attacker.buffStack.handle({actionType:ActionType.afterAttack,target:defender})
  defender.buffStack.handle({actionType:ActionType.afterDefence,target:attacker})
  const damage = calculationNormalDamage(attackInstance,attacker.atk)
  defender.hpAdd(-damage)
}
