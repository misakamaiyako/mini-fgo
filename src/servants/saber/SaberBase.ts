// import { ServantBase } from '@/base/servant';
// import {
//   aggressiveTendATK,
//   AggressiveTendency,
//   aggressiveTendHP,
//   baseATK,
//   baseHP,
//   rankSupplementATK,
//   rankSupplementHP,
//   universal,
// } from '@/base/property';
//
// type Plane ={
//   strength:PanelPropertiesUniversal,
//   durability:PanelPropertiesUniversal,
//   agility:PanelPropertiesUniversal,
//   magic:PanelPropertiesUniversal,
//   luck:PanelPropertiesUniversal
// }
// export default abstract class SaberBase extends ServantBase {
//   protected constructor (plane:Plane, rare:Rare, aggressiveTendency:AggressiveTendency, servantType:'phy' | 'mana') {
//     super();
//     this.baseHp = baseHP[ rare ] * rankSupplementHP[ rare ] * aggressiveTendHP[ aggressiveTendency ] * universal[ plane.durability  ];
//     if (servantType === 'phy') {
//       this.baseAttack = baseATK[ rare ] * rankSupplementATK[ rare ] * aggressiveTendATK[ aggressiveTendency ] * universal[ plane.strength  ] * (universal[ plane.agility ] + universal[ plane.magic  ]) / 2 * (1 - (universal[ plane.strength  ] - 1) * ((universal[ plane.agility  ] + universal[ plane.magic  ]) / 2 - 1));
//     } else {
//       this.baseAttack = baseATK[rare]*rankSupplementATK[rare]*aggressiveTendATK[aggressiveTendency]*universal[plane.magic]
//     }
//   }
// }
