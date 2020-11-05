import Scenes from '@/utils/scenes';

export function leadership (scenes:Scenes, test:(arg0:any) => boolean, promote:number) {
  const friends = scenes.activeServant;
  friends.forEach(t => {
    if (test(t)) {
      const symbol = Symbol('effect');
      t.atkBuffChunk.push({ powerUp: promote, id: symbol });
    }
  });
}
