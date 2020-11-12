import Scenes from '@/base/scenes';
import { ServantBase } from '@/base/servant';

export abstract class SkillBase {
  // effect
  abstract effect:EffectType | Array<EffectType>;
  abstract effectValue:number | Array<number>;
  abstract counter:()=>Counter | Array<Counter>;
  owner:ServantBase;

  // condition
  abstract usable?:(scenes:Scenes) => boolean;
  abstract effective?:(...args:any) => boolean;

  //readable text
  abstract show:boolean;
  abstract valid:boolean;
  abstract description:string|Array<string>;
  abstract counterText:(counter:Counter) => string
  abstract cooldown:number;
  cooldownTimer:number = 0;

  get cd ():number {
    return this.cooldown - this.cooldownTimer - this.level === 10 ? 2 : this.level >= 6 ? 1 : 0;
  }

  set cd (value) {
    this.cooldownTimer = value;
  }

  level:number;
  state:'normal' | 'disabled' | 'strengthened' = 'normal';
  needChooseTarget:boolean = false;

  abstract use :(scenes:Scenes) => void;

  protected constructor (level:number, owner:ServantBase) {
    this.level = level;
    this.owner = owner;
  }
}
