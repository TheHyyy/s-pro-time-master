import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';

// 假设你在某个地方定义了 importance 的映射关系
const importanceMap = {
  1: '紧急且重要',
  2: '重要不紧急',
  3: '紧急不重要',
  4: '不紧急不重要'
};

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  // 获取所有 ToDo
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // 根据 ID 获取 ToDo
  getTodoById(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  // 创建新的 ToDo，增加了新字段
  createTodo(
    title: string, 
    completed: boolean = false, 
    date?: Date, 
    importance: number = 4, // 默认值设为4（'不紧急不重要'）
    estimatedPomodoro: number = 1,
    completedPomodoro: number = 0,
    estimatedEndDate?: Date
  ): Todo {
    const newTodo = new Todo(
      this.todos.length + 1, // id
      title, // title
      completed, // completed
      date, // date (可选)
      importance, // importance 作为数字存储
      estimatedPomodoro, // 预计完成的番茄钟
      completedPomodoro, // 实际完成的番茄钟
      estimatedEndDate // 预计结束日期
    );
    this.todos.push(newTodo);
    return newTodo;
  }

  // 更新 ToDo，允许更新新字段
  updateTodo(id: number, updatedFields: Partial<Todo>): Todo | undefined {
    const todo = this.getTodoById(id);
    if (!todo) return undefined;

    Object.assign(todo, updatedFields); // 合并更新的字段
    return todo;
  }

  // 如果你需要将数字转换回字符串描述，可以添加一个方法或直接在获取时转换
  getImportanceDescription(importance: number): string | undefined {
    return importanceMap[importance];
  }

  // 删除 ToDo
  deleteTodoById(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    this.todos.splice(index, 1);
    return true;
  }
}