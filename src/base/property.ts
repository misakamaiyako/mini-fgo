import { PanelPropertiesUniversal, ServantClass } from '@/base/enums';

export enum AggressiveTendency {
  AllHP,
  tendHP,
  stable,
  tendATK,
  AllATK,
  SaberLily,
}
export const universal = {
  [PanelPropertiesUniversal.EX]: 1.04,
  [PanelPropertiesUniversal['A++']]: 1.03,
  [PanelPropertiesUniversal['A+']]:1.025,
  [PanelPropertiesUniversal.A]:1.02,
  [PanelPropertiesUniversal['A-']]:1.015,
  [PanelPropertiesUniversal['B++']]: 1.01,
  [PanelPropertiesUniversal['B+']]:1.005,
  [PanelPropertiesUniversal.B]:1,
  [PanelPropertiesUniversal['C++']]:0.995,
  [PanelPropertiesUniversal['C+']]:0.9925,
  [PanelPropertiesUniversal['C']]:0.99,
  [PanelPropertiesUniversal['C-']]:0.9875,
  [PanelPropertiesUniversal['D++']]:0.985,
  [PanelPropertiesUniversal['D+']]:0.9825,
  [PanelPropertiesUniversal['D']]:0.98,
  [PanelPropertiesUniversal['E+']]:0.9725,
  [PanelPropertiesUniversal['E']]:0.97,

}
export const mana = [
  0.5,
  0.55,
  0.575,
  0.6,
  0.625,
  0.65,
  0.675,
  0.7,
  0.75,
  0.775,
  0.8,
  0.825,
  0.85,
  0.875,
  0.9,
  0.975,
  1.0,
];
export const maxHP = [8500, 7500, 8500, 10000, 12500, 15000];
export const maxATK = [6200, 5500, 6200, 7000, 9000, 11000];
export const baseHP = [1600, 1500, 1600, 1800, 2000, 2200];
export const baseATK = [1100, 1000, 1100, 1300, 1500, 1700];
export const rankSupplementHP = {
  [ServantClass.saber]: 1.01,
  [ServantClass.archer]: 0.98,
  [ServantClass.lancer]: 1.02,
  [ServantClass.rider]: 0.96,
  [ServantClass.caster]: 0.98,
  [ServantClass.assassin]: 0.95,
  [ServantClass.berserker]: 0.9,
  [ServantClass.ruler]: 1,
  [ServantClass.avenger]: 0.88,
  [ServantClass.alterego]: 0.95,
  [ServantClass.moonCancer]: 1.05,
  [ServantClass.foreigner]: 1,
  [ServantClass.shielder]: 1.01,
  [ServantClass.beast1]: 1,
  [ServantClass.beast2]: 1,
  [ServantClass.beast3L]: 1,
  [ServantClass.beast3R]: 1,
  [ServantClass.beastUnknown]: 1,
};
export const rankSupplementATK = {
  [ServantClass.saber]: 1.01,
  [ServantClass.archer]: 1.02,
  [ServantClass.lancer]: 0.98,
  [ServantClass.rider]: 0.97,
  [ServantClass.caster]: 0.94,
  [ServantClass.assassin]: 0.96,
  [ServantClass.berserker]: 1.03,
  [ServantClass.ruler]: 0.95,
  [ServantClass.avenger]: 1.05,
  [ServantClass.alterego]: 1.02,
  [ServantClass.moonCancer]: 0.94,
  [ServantClass.foreigner]: 1,
  [ServantClass.shielder]: 0.99,
  [ServantClass.beast1]: 1,
  [ServantClass.beast2]: 1,
  [ServantClass.beast3L]: 1,
  [ServantClass.beast3R]: 1,
  [ServantClass.beastUnknown]: 1,
};

export const aggressiveTendHP = {
  [AggressiveTendency.AllHP]: 1.1,
  [AggressiveTendency.tendHP]: 1.05,
  [AggressiveTendency.stable]: 1,
  [AggressiveTendency.tendATK]: 0.95,
  [AggressiveTendency.AllATK]: 0.9,
  [AggressiveTendency.SaberLily]: 0.85,
};
export const aggressiveTendATK = {
  [AggressiveTendency.AllATK]: 1.1,
  [AggressiveTendency.tendATK]: 1.05,
  [AggressiveTendency.stable]: 1,
  [AggressiveTendency.tendHP]: 0.95,
  [AggressiveTendency.AllHP]: 0.9,
  [AggressiveTendency.SaberLily]: 0.85,
};
