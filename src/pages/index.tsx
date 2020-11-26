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
    let d = new AltriaPendragonSaber({
      commanderCardId: [],
      fufu: { atk: 0, cards: [], hp: 0 },
      level: 20,
      noble: { level: 5 },
      status: { atk: 0, hp: 0 },
      useDefault: true
    })
    let scenes = new Scenes([a,b,c,d], [
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
    ].map(t=>{
      t.baseHp=200000;
      return t;
    }))
    a.np=123;
    // a.noble.active(0)
    // @ts-ignore
    window.test = scenes;
  }
}
