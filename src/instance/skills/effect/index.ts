import { ActionType, CardType } from '@/base/enums';
import { NobleAttack, NormalAttack } from '@/base/attack';
import Noble from '@/base/noble';
import { ServantBase } from '@/base/servant';

type attackS = (NormalAttack & { actionType:ActionType.attack } | NobleAttack & { actionType:ActionType.noble })

export function atkChange (amplitude:number) {
  return function(instance:(NormalAttack | NobleAttack) & { actionType:ActionType }):boolean {
    if (instance.actionType === ActionType.noble || instance.actionType === ActionType.attack) {
      instance.attackPower += amplitude;
      return true;
    } else {
      return false;
    }
  };
}


export function colorPerformanceChange (color:CardType, amplitude:number) {
  return function(instance:(NormalAttack | NobleAttack) & { actionType:ActionType }):boolean {
    if ((instance.actionType === ActionType.noble || instance.actionType === ActionType.attack) && color === instance.moveCardColor) {
      instance.moveCardPerformance += amplitude;
      return true;
    } else {
      return false;
    }
  };
}

export function noblePowerChange (amplitude:number) {
  return function(instance:NobleAttack & { actionType:ActionType }):boolean {
    if (instance.actionType === ActionType.noble) {
      instance.noblePower += amplitude;
      return true;
    } else {
      return false;
    }
  };
}

export function damageAppendChange (amplitude:number) {
  return function(instance:(NormalAttack | NobleAttack) & { actionType:ActionType }) {
    if (instance.actionType === ActionType.attack || instance.actionType === ActionType.noble) {
      instance.damageAppend += amplitude;
      return true;
    } else {
      return false;
    }
  };
}


export function weakeningInvalid () {
  return function(instance:{ actionType:ActionType }) {

  };
}

export function overChargeChange (amplitude:number) {
  return function(instance:{ actionType:ActionType.overCharge, noble:Noble }):boolean {
    if (instance.actionType === ActionType.overCharge) {
      instance.noble.overCharge += amplitude;
      return true;
    } else {
      return false;
    }
  };
}

export function specialAttack (target:Array<(S:ServantBase) => boolean>, amplitude:number) {
  return function(instance:{ specialAttack:any[], actionType:ActionType }):boolean {
    if (instance.actionType === ActionType.noble || instance.actionType === ActionType.attack) {
      instance.specialAttack.push(function(S:ServantBase) {
        if (target.some(test => test(S))) {
          return amplitude;
        }
      });
      return true;
    } else {
      return false;
    }
  };
}

export function pierce () {//无敌贯通
  return function(instance:{ pierce:boolean, actionType:ActionType }):boolean {
    if (instance.actionType === ActionType.attack || instance.actionType === ActionType.noble) {
      instance.pierce = true;
      return true;
    } else {
      return false;
    }
  };
}

export function ignoresEvasion () {//必中
  return function(instance:{ ignoresEvasion:boolean, actionType:ActionType }) {
    if (instance.actionType === ActionType.attack || instance.actionType === ActionType.noble) {
      instance.ignoresEvasion = true;
      return true;
    } else {
      return false;
    }
  };
}

export function ignoreDefence () {
  return function(instance:{ ignoreDefence:boolean, actionType:ActionType }) {
    if (instance.actionType === ActionType.attack || instance.actionType === ActionType.noble) {
      instance.ignoreDefence = true;
      return true;
    } else {
      return false;
    }
  };
}


export function defenceChange (amplitude:number) {
  return function(instance:(DefenceInstance & { actionType:ActionType })) {
    if (instance.actionType === ActionType.beNoble || instance.actionType === ActionType.defence) {
      instance.defencePower += amplitude;
      return true;
    } else {
      return false;
    }
  };
}

export function defenceAppendChange (amplitude:number) {
  return function(instance:DefenceInstance & { actionType:ActionType }) {
    if (instance.actionType === ActionType.defence || instance.actionType === ActionType.beNoble) {
      instance.defenceAppend += amplitude;
      return true;
    } else {
      return false;
    }
  };
}

export function evasion () {
  return function(instance:{ evasion:boolean, actionType:ActionType }) {
    if (instance.actionType === ActionType.defence || instance.actionType === ActionType.beNoble) {
      instance.evasion = true;
      return true;
    } else {
      return false;
    }
  };
}

export function invincibility () {
  return function(instance:{ invincibility:boolean, actionType:ActionType }) {
    if (instance.actionType === ActionType.defence || instance.actionType === ActionType.beNoble) {
      instance.invincibility = true;
      return true;
    } else {
      return false;
    }
  };
}

export function solemnDefence () {
  return function(instance:{ solemnDefence:boolean, actionType:ActionType }) {
    if (instance.actionType === ActionType.defence || instance.actionType === ActionType.beNoble) {
      instance.solemnDefence = true;
      return true;
    } else {
      return false;
    }
  };
}

export function CriticalPowerChange (amplitude:number) {
  return function(instance:NormalAttack & { actionType:ActionType.attack }) {
    if (instance.actionType === ActionType.attack) {
      instance.criticPower += amplitude;
      return true;
    } else {
      return false;
    }
  };
}

export function criticalStarChange(amplitude:number){
  return function(instance:{actionType:ActionType.roundEnd,stars:number}){
    if (instance.actionType===ActionType.roundEnd){
      instance.stars+=amplitude
      return true
    } else {
      return false
    }
  }
}
