// src/todo/todo.model.ts
export class Todo {
  id: number;
  title: string;
  completed: boolean;
  date: Date;

  // 修改构造函数，允许传入自定义日期，若没有传入则默认使用当前日期
  constructor(
    id: number,
    title: string,
    completed: boolean = false,
    date?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.date = date || new Date(); // 如果没有传入 date，则使用当前日期
  }
}
