import { ITodoGroup } from '@/shared/model/todo/todo-group.model';

export interface ITodo {
  id?: number;
  title?: string;
  description?: string | null;
  due?: Date | null;
  todoGroup?: ITodoGroup | null;
}

export class Todo implements ITodo {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public due?: Date | null,
    public todoGroup?: ITodoGroup | null
  ) {}
}
