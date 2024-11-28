import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

// 定义统一的响应格式
interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

@Controller('todos') // 设置路由前缀
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 获取所有 ToDo
  @Get()
  getAllTodos(): ApiResponse<Todo[]> {
    const todos = this.todoService.getAllTodos();
    return {
      code: 200,
      data: todos,
    };
  }

  // 根据 ID 获取 ToDo
  @Get(':id')
  getTodoById(@Param('id') id: string): ApiResponse<Todo | undefined> {
    const todo = this.todoService.getTodoById(+id); // 转为数字
    if (todo) {
      return {
        code: 200,
        data: todo,
      };
    } else {
      return {
        code: 404,
        data: undefined,
        message: 'Todo not found',
      };
    }
  }

  // 创建新的 ToDo
  @Post()
  createTodo(@Body('title') title: string): ApiResponse<Todo> {
    const newTodo = this.todoService.createTodo(title);
    return {
      code: 201,
      data: newTodo,
    };
  }

  // 更新 ToDo
  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updatedFields: Partial<Todo>,
  ): ApiResponse<Todo | undefined> {
    const updatedTodo = this.todoService.updateTodo(+id, updatedFields);
    if (updatedTodo) {
      return {
        code: 200,
        data: updatedTodo,
      };
    } else {
      return {
        code: 404,
        data: undefined,
        message: 'Todo not found',
      };
    }
  }

  // 删除 ToDo
  @Delete(':id')
  deleteTodoById(@Param('id') id: string): ApiResponse<boolean> {
    const success = this.todoService.deleteTodoById(+id);
    if (success) {
      return {
        code: 200,
        data: true,
      };
    } else {
      return {
        code: 404,
        data: false,
        message: 'Todo not found',
      };
    }
  }
}
