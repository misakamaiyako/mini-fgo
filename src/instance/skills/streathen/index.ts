import { SkillBase } from '@/base/SkillBase';

export class LeaderShipB extends SkillBase {
  description:string = '攻击力提升';
  effectValue:Array<number> = [ .09, .099, .108, .117, .126, .135, .144, .153, .162, .18 ];
  icon = '';
  name = '领袖气质';
  originColdDown = 7;
  actions = [
    () => {
      this.owner.getTeammate().forEach(t=>{
        if (t){
          t.buffStack
        }
      })
    },
  ];
}
