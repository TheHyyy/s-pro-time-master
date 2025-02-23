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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: '创建待办事项' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const result = await this.todoService.create(createTodoDto);
    return {
      success: true,
      code: 200,
      data: result,
      msg: '创建成功',
      timestamp: new Date().getTime()
    };
  }

  @Get()
  @ApiOperation({ summary: '获取待办事项列表' })
  async findAll() {
    const result = await this.todoService.findAll();
    return {
      success: true,
      code: 200,
      data: result,
      msg: '获取成功',
      timestamp: new Date().getTime()
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新待办事项' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      const result = await this.todoService.update(+id, updateTodoDto);
      return {
        success: true,
        code: 200,
        data: result,
        msg: '更新成功',
        timestamp: new Date().getTime()
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除待办事项' })
  async remove(@Param('id') id: string) {
    const result = await this.todoService.remove(+id);
    return {
      success: true,
      code: 200,
      data: result,
      msg: '删除成功',
      timestamp: new Date().getTime()
    };
  }

  @Get('stats')
  @ApiOperation({ summary: '获取统计信息' })
  async getStats() {
    const result = await this.todoService.getStats();
    return {
      success: true,
      code: 200,
      data: result,
      msg: '获取成功',
      timestamp: new Date().getTime()
    };
  }

  @Patch(':id/pomodoros')
  @ApiOperation({ summary: '更新番茄钟完成数' })
  async updatePomodoros(@Param('id') id: string) {
    const result = await this.todoService.updatePomodoros(+id);
    return {
      success: true,
      code: 200,
      data: result,
      msg: '更新成功',
      timestamp: new Date().getTime()
    };
  }
}
