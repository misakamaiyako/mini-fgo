import { ServantBase } from '@/base/servant';

export abstract class SkillBase {
  abstract name:string;
  abstract originColdDown:number;
  abstract actions:Array<() => void>;
  abstract icon:string;
  abstract description:string;
  abstract effectValue:Array<number>;
  leave:number;

  get maxColdDown () {
    return this.originColdDown - this.leave >= 6 ? this.leave === 10 ? 2 : 1 : 0;
  }

  coolDown:number = 0;
  owner:ServantBase;

  get useCondition ():boolean {
    return true;
  }

  constructor (data:{ leave:number; owner:ServantBase; }) {
    this.leave = data.leave;
    this.owner = data.owner;
  }

  use ():false | void {
    if (this.useCondition) {
      this.actions.forEach(t => t());
    } else {
      return false;
    }
  }
}
