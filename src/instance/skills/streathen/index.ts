import { SkillBase } from '@/base/SkillBase';
import { ActionType, BuffEffect, BuffType, StrengthenType } from '@/base/enums';
import { NobelAttack, NormalAttack } from '@/base/attack';

export class LeaderShipB extends SkillBase {
  description:string = '攻击力提升';
  effectValue:Array<number> = [ .09, .099, .108, .117, .126, .135, .144, .153, .162, .18 ];
  icon = '';
  name = '领袖气质';
  originColdDown = 7;
  actions = [
    () => {
      let action = { actionType: ActionType.gaveStrengthen, strengthType: StrengthenType.attack, chance: 1 };
      const powerUp = this.effectValue[ this.leave ];
      this.owner.buffStack.handle(action);
      this.owner.getTeammate().forEach(t => {
        if (t) {
          const id = Symbol('atkUp');
          let buff:Buff = {
            activeRate: 0,
            buffEffect: BuffEffect.AttackBuffEffect,
            buffType: BuffType.strengthen,
            description ():string {
              return '';
            },
            handle (value:{ actionType:ActionType, [ p:string ]:any }):boolean {
              if (value.actionType === ActionType.attack) {
                (value.attackInstance as NormalAttack).attackPower += powerUp;
                return true;
              }
              if (value.actionType === ActionType.noble) {
                (value.attackInstance as NobelAttack).attackPower += powerUp;
                return true;
              }
              return false;
            },
            id,
            remove (removePower:number):boolean {
              if (Math.random() > 1 - removePower) {
                const index = t.buffStack.stack.findIndex(t => t.id === id);
                t.buffStack.stack.splice(index, 1);
                return true;
              }
              return false;
            },
            get shouldRemove () {
              return this.timer.round === 0;
            },
            timer: {
              round: 3,
              times: Infinity,
            },
          };
          t.buffStack.stack.push(buff);
        }
      });
    },
  ];
  withStrength:boolean = true;
  withWeaken:boolean = false;
}
