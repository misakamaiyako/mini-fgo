import { NormalAttack } from '@/base/attack';
import { ServantBase } from '@/base/servant';

export function classAttackPatch (servantClass:ServantClass):number {
  return 1
}
export function restraint(attacker:ServantClass,defender:ServantClass):number{
  return 1
}
export function hiddenCharacteristicRestraint(attacker:hiddenCharacteristic,defender:hiddenCharacteristic):number{
  return 1
}
export function calculationNormalDamage(attackInstance:NormalAttack, atk:number){
  return (atk * 0.23 * ((attackInstance.moveCardRate * (1 + attackInstance.moveCardPerformance - attackInstance.moveCardEndurance)) + attackInstance.firstBonus) * attackInstance.rankSupplement * attackInstance.rankRestraint * attackInstance.hiddenStatus * (1 + attackInstance.attackPower - attackInstance.defencePower - attackInstance.specialDefend) * (1 + attackInstance.isCritic) * (1 + attackInstance.specialAttack + attackInstance.criticPower * attackInstance.isCritic) * attackInstance.extraBonus * attackInstance.moveCardHitRate * attackInstance.random) + attackInstance.damageAppend - attackInstance.defenceAppend + attackInstance.busterChainBonus
}
export function bonusNp(){
  //NP率 * (指令卡补正 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性) + 首位加成) * 敌补正 * (1 ± NP获得量BUFF) * 暴击补正 * Overkill补正
  //
  // 每一hit的受击NP获得公式：
  // 受击NP率 * 敌补正 * (1 ± NP获得量BUFF) * (1 ± 受击NP获得量BUFF) * Overkill补正
}
