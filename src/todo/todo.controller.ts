import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('todo')
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: '创建待办事项' })
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return await this.todoService.create(req.user.id, createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: '获取待办事项列表' })
  async findAll(@Request() req) {
    return await this.todoService.findAll(req.user.id);
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
    return await this.todoService.remove(+id);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取统计信息' })
  async getStats(@Request() req) {
    return await this.todoService.getStats(req.user.id);
  }

  @Patch(':id/pomodoros')
  @ApiOperation({ summary: '更新番茄钟完成数' })
  async updatePomodoros(@Param('id') id: string) {
    return await this.todoService.updatePomodoros(+id);
  }
}
