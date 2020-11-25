import React from 'react';
import AltriaPendragonSaber from '@/servants/saber/AltriaPendragon/AltriaPendragon';
import Scenes from '@/base/scenes';

export default class Index extends React.Component<any, any>{
  render () {
    return <div>123</div>
  }
  componentDidMount () {
    let a = new AltriaPendragonSaber({
      commanderCardId: [],
      fufu: { atk: 0, cards: [], hp: 0 },
      level: 90,
      noble: { level: 5 },
      status: { atk: 0, hp: 0 },
      useDefault: true
    })
    let b = new AltriaPendragonSaber({
      commanderCardId: [],
      fufu: { atk: 0, cards: [], hp: 0 },
      level: 90,
      noble: { level: 5 },
      status: { atk: 0, hp: 0 },
      useDefault: true
    })
    let c = new AltriaPendragonSaber({
      commanderCardId: [],
      fufu: { atk: 0, cards: [], hp: 0 },
      level: 90,
      noble: { level: 5 },
      status: { atk: 0, hp: 0 },
      useDefault: true
    })
    let scenes = new Scenes([a,b,c])
    scenes.activeEnemy = [
      new AltriaPendragonSaber({
        commanderCardId: [],
        fufu: { atk: 0, cards: [], hp: 0 },
        level: 90,
        noble: { level: 5 },
        status: { atk: 0, hp: 0 },
        useDefault: true
      }),new AltriaPendragonSaber({
        commanderCardId: [],
        fufu: { atk: 0, cards: [], hp: 0 },
        level: 90,
        noble: { level: 5 },
        status: { atk: 0, hp: 0 },
        useDefault: true
      }),new AltriaPendragonSaber({
        commanderCardId: [],
        fufu: { atk: 0, cards: [], hp: 0 },
        level: 90,
        noble: { level: 5 },
        status: { atk: 0, hp: 0 },
        useDefault: true
      })
    ]
    a.noble.active(1)
    // @ts-ignore
    window.test = scenes;
  }
}
