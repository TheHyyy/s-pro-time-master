import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';

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

  // 创建新的 ToDo
  createTodo(title: string): Todo {
    const newTodo = new Todo(this.todos.length + 1, title);
    this.todos.push(newTodo);
    return newTodo;
  }

  // 更新 ToDo
  updateTodo(id: number, updatedFields: Partial<Todo>): Todo | undefined {
    const todo = this.getTodoById(id);
    if (!todo) return undefined;

    Object.assign(todo, updatedFields);
    return todo;
  }

  // 删除 ToDo
  deleteTodoById(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    this.todos.splice(index, 1);
    return true;
  }
}
