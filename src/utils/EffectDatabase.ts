import Scenes from '@/utils/scenes';

export function leadership (scenes:Scenes, test:(...arg0:any) => boolean, symbol:Symbol, promote:number) {
  const friends = scenes.activeServant;
  friends.forEach(t => {
    if (test(t)) {
      t.atkBuffChunk.push({ powerUp: promote, id: symbol });
    }
  });
}
