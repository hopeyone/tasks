import { ITodo } from '@/shared/model/todo/todo.model';

export interface ITodoGroup {
  id?: number;
  name?: string;
  todos?: ITodo[] | null;
}

export class TodoGroup implements ITodoGroup {
  constructor(public id?: number, public name?: string, public todos?: ITodo[] | null) {}
}
