import { ServantBase } from '@/utils/servant';

export default class Scenes {
  aliveServant:Array<ServantBase>;
  aliveEnemy:Array<ServantBase>;
  diedServant:Array<ServantBase> = [];
  diedEnemy:Array<ServantBase> = [];
  activeServant:Array<ServantBase>;
  activeEnemy:Array<ServantBase>;

  get win () {
    return this.aliveEnemy.length === 0;
  }
  roundStart(){
    this.activeServant.forEach(t=>{
      t.moveProcesses.forEach(g=>{
        if (g.roundEnd){
          g.roundEnd(this.activeServant,this.activeEnemy)
        }
      })
    })
    this.activeEnemy.forEach(t=>{
      t.moveProcesses.forEach(g=>{
        if (g.roundEnd){
          g.roundEnd(this.activeEnemy,this.activeServant)
        }
      })
    })
  }
  roundEnd(){
    this.activeServant.forEach(t=>{
      if (t.hp>0){
        t.moveProcesses.forEach(g=>{
          if (g.roundEnd){
            g.roundEnd(this.activeServant,this.activeEnemy)
          }
        })
      } else {
        t.moveProcesses.forEach(g=>{
          if (g.death){
            g.death(this.activeServant,this.activeEnemy)
          }
        })
      }
    })
    this.activeEnemy.forEach(t=>{
      if (t.hp>0){
        t.moveProcesses.forEach(g=>{
          if (g.roundEnd){
            g.roundEnd(this.activeEnemy,this.activeServant)
          }
        })
        // todo  remove this servant to death line
      } else {
        t.moveProcesses.forEach(g=>{
          if (g.death){
            g.death(this.activeEnemy,this.activeServant)
          }
        })
      }
    })
    if (this.)
  }
}
