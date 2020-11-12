import { MoveCard } from '@/base/servant';

enum BuffType {
  strengthen, weaken,notDuality
}
enum AttackBuffEffect{
  attack,
  moveCardPerformance,
  specialAttack,
  damageAttach,
  moveCardAttack,
  criticalPower,
  criticalChance,
  noblePower,
  ignoreAvoid,
  ignoreInvincible,
  ignoreDefence
}
enum defenceBuffEffect{
  defence,
  defenceAttach,
  specialDefence,
  moveCardEndurance,
  avoid,
  invincible,
  againstPurge
}
enum Critical{
  concentrated,
  drop,
  gain
}
enum NPState {
  gainRate,
  gainRateOnTurnEnd,
  gainRateOnGetHit
}
enum HPState {
  recoverCoefficient,
  recoverByTurnEnd,
  maxHP
}
enum AdditionalEffect{
  afterAttack
}
enum OtherEffect{
  targetConcentrated,
  statusSetChange,
  specialEndurance,
  weakenEndurance,
  noStrengthen,
  noWeaken,
  strengthenRemoveEndurance,
  weakenRemoveEndurance,
  beCriticalChance,
  dieChance,
  dieEndurance,
  maxDieEndurance,
  mentalDisorder,
  dot,
  delayed,
  others
}
enum OtherEffect2{
  others
}
type BuffEffect=AttackBuffEffect|defenceBuffEffect|Critical|NPState|HPState|AdditionalEffect|OtherEffect|OtherEffect2

interface DirectlyEffectiveBuff{
  value:number,
  id:Symbol
}
interface Buff {
  id:Symbol,
  buffType:BuffType,
  buffEffect:BuffEffect,
  test:(...args:any)=>boolean,
  timer:{
    times:number,
    round:number
  },
  value:number,
  description:()=>string,
  shouldRemove:boolean,
  remove:(removePower:number)=>boolean
}

interface BuffStack {
  stack:Array<Buff>,
  push:(buff:Buff)=>boolean,
  find:(buffType:BuffType,buffEffect:BuffEffect|'all')=>Array<Buff>
}

abstract class ServantBase{
  /**
   * @description id
   */
  abstract id:number;

  /**
   * @description 名称
   */
  abstract name:string;

  /**
   * @description 主动技能组，可以为空
   */
  abstract skills:Array<Skill>;

  /**
   * @description 被动技能组
   */
  abstract positiveSkill:Array<Skill>;
  /**
   * @description 等级
   */
  level:number = 0;

  /**
   * @description 是否使用成长曲线计算血量
   * @todo 添加成长曲线
   */
  abstract useDefaultHPLine:boolean;

  /**
   * @description 指令卡，可以为空数组
   */
  moveCard:Array<MoveCard> = []

  /**
   * @description 血量
   */
  baseHp:number = 0;
  strengthenHp:number = 0;//fufu
  suitHp:number = 0;
  HpBuff:Array<DirectlyEffectiveBuff> = [];
  HpRecoverOnRoundEnd:Array<DirectlyEffectiveBuff> = [];
  HpRecoverCoefficient:number = 1;
  #hp:number=0;
  get hp(){
    return Math.ceil(this.#hp)
  }
  set hp(value){
    console.warn('you should use this function only when hp max is changed');
    console.warn('use hpAdd(change:number) to change hp');
    this.#hp = value;
  }
  hpAdd(value:number):number {
    if (value>0){
      this.#hp+=value*this.HpRecoverCoefficient
      this.buffStack.find(BuffType.strengthen, HPState.recoverCoefficient).forEach(t=>{
        t.timer.times--
        if (t.shouldRemove){
          t.remove(Infinity)
        }
      })
    } else {
      this.#hp-=value;
      if (this.hp<=0){
        this.#hp = 0;
        this.death()
      }
    }
    return this.hp
  }

  /**
   * @description 攻击力
   */
  baseAttack:number = 0;
  strengthenAttack:number = 0;//fufu
  suitAttack:number = 0;

  buffStack:BuffStack = {
    stack: [],
    push (buff:Buff) {
      this.stack.push(buff)
      return true
    },
    find(buffType:BuffType|'all',buffEffect:BuffEffect|'all'){
      let typeSuited = buffType==='all'?this.stack:this.stack.filter(t=>t.buffType===buffType);
      return buffEffect === 'all' ? typeSuited : typeSuited.filter(t => t.buffEffect === buffEffect)
    }
  }
  death(){

  }
}
