// src/todo/todo.model.ts
export class Todo {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean = false,
    public date?: Date,
    public importance: number = 4,
    public estimatedPomodoro: number = 1, // 预计番茄钟数
    public completedPomodoros: number = 0, // 已完成番茄钟数
    public estimatedEndDate?: Date,
  ) {}
}
