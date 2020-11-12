import { SkillBase } from '@/base/skillDatabase';
import Scenes from '@/base/scenes';

export class LeaderShipB extends SkillBase {
  cooldown:number = 7;
  counter = ():Counter => ({
    round: 3,
  });

  counterText = (counter:Counter):string => `剩余${ counter }回合`;

  description:string = '攻击力提升';
  effect:EffectType | Array<EffectType> = 'attack';
  effectValue:Array<number> = [ .09, .099, .108, .117, .126, .135, .144, .153, .162, .18 ];
  show:boolean = true;

  use = (scenes:Scenes):void => {
    const friend = scenes.activeServant;
    const symbol = Symbol('LeaderShipB');
    const powerUp = this.effectValue[ this.level ];
    friend.forEach(t => {
      let counter = this.counter() as { round:number };
      let buff:Buff = {
        affix: this.counterText(counter),
        canRemove: true,
        id: symbol,
        text: this.description,
        type: 'attack',
        remove (removePower) {
          if (removePower){
            if (this.canRemove){
              const resistance = t.resistance
            } else {
              console.log('filled');
              return false
            }
          }
        },
      };
      t.atkBuffChunk.push({ powerUp, id: symbol });
      t.buff.push(buff);
      t.moveProcesses.push({
        id: symbol,
        roundEnd ():number {
          counter.round--;
          if (counter.round <= 0) {
            buff.remove();
          }
          return 0;
        },

      });
    });
  };

  valid:boolean = true;
}
