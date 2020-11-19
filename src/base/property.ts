const mana = [
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
const maxHP = [8500, 7500, 8500, 10000, 12500, 15000];
const maxATK = [6200, 5500, 6200, 7000, 9000, 11000];
const baseHP = [1600, 1500, 1600, 1800, 2000, 2200];
const baseATK = [1100, 1000, 1100, 1300, 1500, 1700];
const rankSupplementHP = {
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
  [ServantClass.beastUnknow]: 1,
};
const rankSupplementATK = {
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
  [ServantClass.beastUnknow]: 1,
};

enum AggressiveTendency {
  AllHP,
  tendHP,
  stable,
  tendATK,
  AllATK,
  SaberLily,
}

const aggressiveTendHP = {
  [AggressiveTendency.AllHP]: 1.1,
  [AggressiveTendency.tendHP]: 1.05,
  [AggressiveTendency.stable]: 1,
  [AggressiveTendency.tendATK]: 0.95,
  [AggressiveTendency.AllATK]: 0.9,
  [AggressiveTendency.SaberLily]: 0.85,
};
const aggressiveTendATK = {
  [AggressiveTendency.AllATK]: 1.1,
  [AggressiveTendency.tendATK]: 1.05,
  [AggressiveTendency.stable]: 1,
  [AggressiveTendency.tendHP]: 0.95,
  [AggressiveTendency.AllHP]: 0.9,
  [AggressiveTendency.SaberLily]: 0.85,
};
