import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Controller('todos') // 设置路由前缀
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 获取所有 ToDo
  @Get()
  getAllTodos(): Todo[] {
    return this.todoService.getAllTodos();
  }

  // 根据 ID 获取 ToDo
  @Get(':id')
  getTodoById(@Param('id') id: string): Todo | undefined {
    return this.todoService.getTodoById(+id); // 转为数字
  }

  // 创建新的 ToDo
  @Post()
  createTodo(@Body('title') title: string): Todo {
    return this.todoService.createTodo(title);
  }

  // 更新 ToDo
  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updatedFields: Partial<Todo>,
  ): Todo | undefined {
    return this.todoService.updateTodo(+id, updatedFields);
  }

  // 删除 ToDo
  @Delete(':id')
  deleteTodoById(@Param('id') id: string): boolean {
    return this.todoService.deleteTodoById(+id);
  }
}
