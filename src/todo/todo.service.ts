import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = this.todoRepository.create({
        ...createTodoDto,
        completed: false,
        pomodoroCount: 0
      });

      return await this.todoRepository.save(todo);
    } catch (error) {
      console.error('Create todo error:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.todoRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.todoRepository.findOne({ 
        where: { id }
      });
      
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }

      // 更新字段
      Object.assign(todo, updateTodoDto);
      
      return await this.todoRepository.save(todo);
    } catch (error) {
      console.error('Update todo error:', error);
      throw error;
    }
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    await this.todoRepository.remove(todo);
    return { success: true };
  }

  async getStats() {
    const todos = await this.todoRepository.find();

    // 计算四象限分布
    const quadrantDistribution = todos.reduce((acc, todo) => {
      acc[todo.quadrant] = (acc[todo.quadrant] || 0) + 1;
      return acc;
    }, {});

    // 计算每周完成情况
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weeklyCompletion = {
      completed: new Array(7).fill(0),
      pending: new Array(7).fill(0)
    };

    todos.forEach(todo => {
      const createdDate = new Date(todo.createdAt);
      if (createdDate >= weekStart) {
        const dayIndex = createdDate.getDay();
        if (todo.completed) {
          weeklyCompletion.completed[dayIndex]++;
        } else {
          weeklyCompletion.pending[dayIndex]++;
        }
      }
    });

    return {
      totalCount: todos.length,
      completedCount: todos.filter(t => t.completed).length,
      quadrantDistribution,
      weeklyCompletion
    };
  }

  async updatePomodoros(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    todo.pomodoroCount += 1;
    return await this.todoRepository.save(todo);
  }
}