// src/todo/todo.model.ts
export class Todo {
  id: number;
  title: string;
  completed: boolean;
  date: Date;
  importance: number; // 1-4 表示不同的重要程度
  estimatedPomodoro: number;
  completedPomodoro: number;
  estimatedEndDate: Date | null; // 可以是 null，如果没有具体的结束日期

  constructor(
    id: number,
    title: string,
    completed: boolean = false,
    date: Date = new Date(), // 如果没有传入 date，则使用当前日期
    importance: number = 4, // 默认值为4（不紧急不重要）
    estimatedPomodoro: number = 1,
    completedPomodoro: number = 0,
    estimatedEndDate: Date | null = null, // 默认值为 null
  ) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.date = date;
    this.importance = importance;
    this.estimatedPomodoro = estimatedPomodoro;
    this.completedPomodoro = completedPomodoro;
    this.estimatedEndDate = estimatedEndDate;
  }
}