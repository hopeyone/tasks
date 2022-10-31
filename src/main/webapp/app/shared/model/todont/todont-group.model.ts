import { ITodont } from '@/shared/model/todont/todont.model';

export interface ITodontGroup {
  id?: number;
  name?: string;
  todonts?: ITodont[] | null;
}

export class TodontGroup implements ITodontGroup {
  constructor(public id?: number, public name?: string, public todonts?: ITodont[] | null) {}
}
