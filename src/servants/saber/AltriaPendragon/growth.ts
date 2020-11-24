export default  function growth(leave:number) {
  const atk = Math.round((11221.1-1734.17)/89 * (leave-1) + 1734.17);
  const hp = Math.round((15150-2222)/89 * (leave-1) + 2222);
  return { atk, hp };
};
//1734	11221	11221	12283	14283
// 职阶补正后	1734	11221	11221	12283	14283
// HP	2222	15150	15150	16597	18597
