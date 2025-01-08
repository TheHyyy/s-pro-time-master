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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { responseMessage } from '../utils/response';
import { Todo } from './entities/todo.entity';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: '获取所有待办事项' })
  async getAllTodos() {
    const todos = await this.todoService.getAllTodos();
    return responseMessage(todos);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个待办事项' })
  async getTodoById(@Param('id') id: string) {
    const todo = await this.todoService.getTodoById(+id);
    return responseMessage(todo);
  }

  @Post()
  @ApiOperation({ summary: '创建待办事项' })
  async createTodo(@Body() todoData: Partial<Todo>) {
    const todo = await this.todoService.createTodo(todoData);
    return responseMessage(todo);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新待办事项' })
  async updateTodo(@Param('id') id: string, @Body() todoData: Partial<Todo>) {
    const todo = await this.todoService.updateTodo(+id, todoData);
    return responseMessage(todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除待办事项' })
  async deleteTodoById(@Param('id') id: string) {
    const success = await this.todoService.deleteTodoById(+id);
    return responseMessage(success);
  }

  @Patch(':id/pomodoros')
  @ApiOperation({ summary: '更新任务的番茄钟完成数' })
  async updatePomodoros(@Param('id') id: string) {
    const todo = await this.todoService.updatePomodoros(+id);
    return responseMessage(todo);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取任务统计信息' })
  async getStats() {
    const stats = await this.todoService.getTodoStats();
    return responseMessage(stats);
  }
}
