import { ITodontGroup } from '@/shared/model/todont/todont-group.model';

export interface ITodont {
  id?: number;
  title?: string;
  description?: string | null;
  due?: Date | null;
  todontGroup?: ITodontGroup | null;
}

export class Todont implements ITodont {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public due?: Date | null,
    public todontGroup?: ITodontGroup | null
  ) {}
}
