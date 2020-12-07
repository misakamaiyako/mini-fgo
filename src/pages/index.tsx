import React from 'react';
import AltriaPendragonSaber from '@/servants/saber/AltriaPendragon/AltriaPendragon';
import Scenes from '@/base/scenes';
import { CardType, ChainType } from '@/base/enums';
import { Attack } from '@/base/attack';
import { ServantBase } from '@/base/servant';

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
    a.noble.cardType = CardType.art
    b.noble.cardType = CardType.quick
    scenes.target = (scenes.activeServant as ServantBase[])[0]
    a.noble.active(0)
    const attack1 = new Attack(a,a.moveCard[3],1,CardType.buster, ChainType.buster)
    const attack2 = new Attack(a,a.moveCard[4],2,CardType.buster, ChainType.buster)
    const attack3 = new Attack(a,a.moveCard[5],3,CardType.buster, ChainType.buster)
    attack1.attack(scenes.target,false)
    console.log(scenes)
    attack2.attack(scenes.target,false)
    console.log(scenes)
    attack3.attack(scenes.target,true)
    console.log(scenes)
    // a.noble.active(0)
    // @ts-ignore
    window.test = scenes;
  }
}
