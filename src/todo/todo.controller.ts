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
import { ResponseDto } from '@/dto/response.dto'; // 引入统一的响应体 DTO
import { RESPONSE_MSG } from '@/enums'; // 引入响应提示语枚举

@Controller('todos') // 设置路由前缀
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 获取所有 ToDo
  @Get()
  getAllTodos(): ResponseDto {
    const todos = this.todoService.getAllTodos();
    return {
      code: 200,
      data: todos,
      msg: RESPONSE_MSG.SUCCESS,
      timestamp: Date.now(),
    };
  }

  // 根据 ID 获取 ToDo
  @Get(':id')
  getTodoById(@Param('id') id: string): ResponseDto {
    const todo = this.todoService.getTodoById(+id); // 转为数字
    if (todo) {
      return {
        code: 200,
        data: todo,
        msg: RESPONSE_MSG.SUCCESS,
        timestamp: Date.now(),
      };
    } else {
      return {
        code: 404,
        data: undefined,
        msg: RESPONSE_MSG.NOT_FOUND,
        timestamp: Date.now(),
      };
    }
  }

  // 创建新的 ToDo
  @Post()
  createTodo(
    @Body() body: { title: string; completed?: boolean; date?: Date },
  ): ResponseDto {
    // 默认 completed 为 false, date 为当前时间
    const { title, completed = false, date } = body;
    const newTodo = this.todoService.createTodo(title, completed, date);
    return {
      code: 201,
      data: newTodo,
      msg: '创建成功',
      timestamp: Date.now(),
    };
  }

  // 更新 ToDo
  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() updatedFields: Partial<Todo>,
  ): ResponseDto {
    const updatedTodo = this.todoService.updateTodo(+id, updatedFields);
    if (updatedTodo) {
      return {
        code: 200,
        data: updatedTodo,
        msg: RESPONSE_MSG.UPDATED,
        timestamp: Date.now(),
      };
    } else {
      return {
        code: 404,
        data: undefined,
        msg: RESPONSE_MSG.NOT_FOUND,
        timestamp: Date.now(),
      };
    }
  }

  // 删除 ToDo
  @Delete(':id')
  deleteTodoById(@Param('id') id: string): ResponseDto {
    const success = this.todoService.deleteTodoById(+id);
    if (success) {
      return {
        code: 200,
        data: true,
        msg: RESPONSE_MSG.DELETED,
        timestamp: Date.now(),
      };
    } else {
      return {
        code: 404,
        data: false,
        msg: RESPONSE_MSG.NOT_FOUND,
        timestamp: Date.now(),
      };
    }
  }
}
