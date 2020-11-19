import { AttackerNp, DefenderNp, NormalAttack, StarBonus } from '@/base/attack';

export function classAttackPatch (servantClass:ServantClass):number {
  const matrix = {
    'saber': 1,
    'archer': 0.95,
    'lancer': 1.05,
    'rider': 1,
    'caster': 0.9,
    'assassin': 0.9,
    'berserker': 1.1,
    'ruler': 1.1,
    'avenger': 1.1,
    'alterego': 1,
    'moonCancer': 1,
    'foreigner': 1,
    'shielder': 1,
  };
  // @ts-ignore
  return matrix[ servantClass ] || 1;
}

export function restraint (attacker:ServantClass, defender:ServantClass):number {
  const matrix = [[1,0.5,2,1,1,1,2,0.5,1,1,1,1,1,1,1,1,1,0],[2,1,0.5,1,1,1,2,0.5,1,1,1,1,1,1,1,1,1,0],[0.5,2,1,1,1,1,2,0.5,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,2,0.5,2,0.5,1,1,1,1,1,2,1,1,1,0],[1,1,1,0.5,1,2,2,0.5,1,1,1,1,1,2,1,1,1,0],[1,1,1,2,0.5,1,2,0.5,1,1,1,1,1,2,1,1,1,0],[1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,0.5,1,1.5,1,1,1,0],[1,1,1,1,1,1,2,1,0.5,1,2,1,1,1,1,1,1,0],[1,1,1,1,1,1,2,2,1,1,0.5,1,1,1,1,1,1,0],[0.5,0.5,0.5,1.5,1.5,1.5,2,1,1,1,1,2,1,1,1,1.2,1.2,0],[1,1,1,1,1,1,2,0.5,2,1,1,1,1,1,1,1.2,1,0],[1,1,1,1,1,1,2,1,1,0.5,1,2,1,1,1,1,1.2,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[2,2,2,1,1,1,2,1,0.5,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,0]]
  return 1;
}

export function hiddenCharacteristicRestraint (attacker:hiddenCharacteristic, defender:hiddenCharacteristic):number {
  const matrix = {
    god:{
      legend:1.1,
      human: 0.9
    },
    legend: {
      human: 1.1,
      god: 0.9
    },
    human: {
      god: 1.1,
      legend: 0.9
    },
    beast:{
      beast: 1.1
    }
  }
  // @ts-ignore
  const restraint:number|undefined = matrix[attacker][defender];
  return restraint===undefined?1:restraint;
}

export function calculationNormalDamage (attackInstance:NormalAttack, atk:number) {
  return (atk * 0.23 * ((attackInstance.moveCardRate * (1 + attackInstance.moveCardPerformance - attackInstance.moveCardEndurance)) + attackInstance.firstBonus) * attackInstance.rankSupplement * attackInstance.rankRestraint * attackInstance.hiddenStatus * (1 + attackInstance.attackPower - attackInstance.defencePower - attackInstance.specialDefend) * (1 + attackInstance.isCritic) * (1 + attackInstance.specialAttack + attackInstance.criticPower * attackInstance.isCritic) * attackInstance.extraBonus * attackInstance.moveCardHitRate * attackInstance.random) + attackInstance.damageAppend - attackInstance.defenceAppend + attackInstance.busterChainBonus;
}

//NP率 * (指令卡补正 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性) + 首位加成) * 敌补正 * (1 ± NP获得量BUFF) * 暴击补正 * Overkill补正
export function calculationAttackerBonusNp (attackNpInstance:AttackerNp) {
  return attackNpInstance.npRate * (attackNpInstance.moveCaredBonus * (1 + attackNpInstance.moveCardPerformance - attackNpInstance.moveCardEndurance) + attackNpInstance.firstBonus) * attackNpInstance.targetBonus * (1 + attackNpInstance.NpBonus) * attackNpInstance.isCritic * attackNpInstance.overKillBonus;
}

// 受击NP率 * 敌补正 * (1 ± NP获得量BUFF) * (1 ± 受击NP获得量BUFF) * Overkill补正
export function calculationDefenderBonusNp (defenderNpInstance:DefenderNp) {
  return defenderNpInstance.defenceNpRate * defenderNpInstance.attackerNpBonus * (1 + defenderNpInstance.defenceNpBonus) * defenderNpInstance.overKillBonus;
}

//从者掉星率 + 指令卡掉星率 * (1 ± 指令卡性能BUFF ∓ 指令卡耐性) + 首位加成 + 敌补正 ± 掉星率BUFF ± 敌人掉星率BUFF + 暴击补正 + Overkill补正
export function calculationStarBonus (starInstance:StarBonus) {
  let count = starInstance.servantStarDropRate + starInstance.moveCardStarDropRate * (1 + starInstance.moveCardPerformance - starInstance.moveCardEndurance) + starInstance.firstBonus + starInstance.targetBonus + starInstance.starDropRateBuff + starInstance.targetStarDropRateBuff + starInstance.isCritic + starInstance.overKillBonus;
  if (count !== (count | 0)) {
    let dim = count - (count | 0);
    count = (count | 0) + (Math.random() < dim ? 1 : 0);
  }
  return Math.min(3, count);
}

export function moveCardStarDropRate (cardType:CardType, position:0 | 1 | 2 | 3) {
  const matrix = {
    [ CardType.buster ]: [ 0.1, 0.15, 0.2, 0 ],
    [ CardType.art ]: [ 0, 0, 0, 0 ],
    [ CardType.quick ]: [ 0.8, 1.3, 1.8, 0 ],
    [ CardType.extra ]: [ 0, 0, 0, 1 ],
  };
  return matrix[ cardType ][ position ];
}

export function targetBonus (targetClass:ServantClass) {
  const matrix = {
    'saber': 0,
    'archer': 0.05,
    'lancer': -0.05,
    'rider': 0.1,
    'caster': 0,
    'assassin': -0.1,
    'berserker': 0,
    'ruler': 0,
    'avenger': -0.1,
    'alterego': 0.05,
    'moonCancer': 0,
    'foreigner': 0.2,
    'shielder': 0,
  };
  // @ts-ignore
  return matrix[ targetClass ] || 0;
}
