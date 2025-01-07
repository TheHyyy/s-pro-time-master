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
      success: true,
      code: 200,
      data: todos,
      msg: RESPONSE_MSG.SUCCESS,
      timestamp: Date.now(), // 保留时间戳（可根据需求选择去掉）
    };
  }

  // 根据 ID 获取 ToDo
  @Get(':id')
  getTodoById(@Param('id') id: string): ResponseDto {
    const todo = this.todoService.getTodoById(+id); // 转为数字
    if (todo) {
      return {
        success: true,
        code: 200,
        data: todo,
        msg: RESPONSE_MSG.SUCCESS,
        timestamp: Date.now(),
      };
    } else {
      return {
        success: false,
        code: 404,
        data: null,
        msg: RESPONSE_MSG.NOT_FOUND,
        timestamp: Date.now(),
      };
    }
  }

  // 创建新的 ToDo
  @Post()
  createTodo(
    @Body()
    body: {
      title: string;
      completed?: boolean;
      date?: Date;
      importance?: number;
      estimatedPomodoro?: number;
      completedPomodoro?: number;
      estimatedEndDate?: Date;
    },
  ): ResponseDto {
    const {
      title,
      completed = false,
      date = new Date(),
      importance = 4,
      estimatedPomodoro = 1,
      completedPomodoro = 0,
      estimatedEndDate,
    } = body;

    const newTodo = this.todoService.createTodo(
      title,
      completed,
      date,
      importance,
      estimatedPomodoro,
      completedPomodoro,
      estimatedEndDate,
    );
    return {
      success: true,
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
        success: true,
        code: 200,
        data: updatedTodo,
        msg: RESPONSE_MSG.UPDATED,
        timestamp: Date.now(),
      };
    } else {
      return {
        success: false,
        code: 404,
        data: null,
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
        success: true,
        code: 200,
        data: true,
        msg: RESPONSE_MSG.DELETED,
        timestamp: Date.now(),
      };
    } else {
      return {
        success: false,
        code: 404,
        data: false,
        msg: RESPONSE_MSG.NOT_FOUND,
        timestamp: Date.now(),
      };
    }
  }

  // 更新番茄钟完成数
  @Patch(':id/pomodoros')
  updateTodoPomodoros(@Param('id') id: string): ResponseDto {
    const updatedTodo = this.todoService.updateTodoPomodoros(+id);
    if (updatedTodo) {
      return {
        success: true,
        code: 200,
        data: updatedTodo,
        msg: '番茄钟完成数更新成功',
        timestamp: Date.now(),
      };
    } else {
      return {
        success: false,
        code: 404,
        data: null,
        msg: RESPONSE_MSG.NOT_FOUND,
        timestamp: Date.now(),
      };
    }
  }
}
