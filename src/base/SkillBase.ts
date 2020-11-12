import Scenes from '@/base/scenes';
import { ServantBase } from '@/base/servant';
function attackUP(servant:ServantBase,promote:number,symbol:symbol,countdown:Array<MoveProcess>){
  servant.atkBuffChunk.push({powerUp:promote,id:symbol})
  servant.moveProcesses=servant.moveProcesses.concat(countdown)
}
function normalRoundEnd(this:MoveProcess,t:ServantBase,buff:Buff,symbol:symbol): () => number{
  return function(this:MoveProcess){
    if(this.timer){
      this.timer--;
      buff.affix = `剩余${this.timer}回合`
      if (this.timer<=0){
        t.moveProcesses.forEach((u,v)=>{
          if (u.id===symbol){
            t.moveProcesses.splice(v,1)
          }
        })
      }
    }
    return 0;
  }.bind(this)
}
export function allAttackUp (scenes:Scenes, test:(...arg0:any) => boolean, symbol:symbol, promote:number) {
  const friends = scenes.activeServant;
  friends.forEach(t => {
    if (test(t)) {
      let moveProcess:Array<MoveProcess> = [];
      let buff:Buff = {
        affix: '剩余3回合', canRemove: true, id: symbol, text: '攻击力提升' + promote, type: 'attack'
      }
      let m:MoveProcess = {
        id: symbol,
        timer: 3
      }
      m.roundEnd = normalRoundEnd.bind(m)(t,buff,symbol)
      moveProcess.push(m)
      t.buff.push(buff)
      attackUP(t,promote,symbol,moveProcess)
    }
  });
}
export function busterUp (scenes:Scenes, test:(...arg0:any) => boolean, symbol:symbol, promote:number) {
  const self = scenes.activeServant.find(t=>test(t))
  if (self){
    let moveProcess:Array<MoveProcess> = [];
    let buff:Buff = {
      affix: '剩余1回合', canRemove: true, id: symbol, text: 'buster提升', type: 'attack'
    }
    let m:MoveProcess = {
      id: symbol,
      timer: 3
    }
    m.roundEnd = normalRoundEnd.bind(m)(self,buff,symbol)
    moveProcess.push(m)
    self.buff.push(buff)
  }
}
