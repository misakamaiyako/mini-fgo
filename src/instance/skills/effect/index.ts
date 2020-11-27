import { ServantBase } from '@/base/servant';
import { ActionType, StrengthenType } from '@/base/enums';

export function atkUpAll (giver:ServantBase, power:number, chance:number, times:number, count:number) {
  let action = { actionType: ActionType.gaveStrengthen, strengthType: StrengthenType.attack, chance: chance };
}
