import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createTodoDto: CreateTodoDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const todo = this.todoRepository.create({
        ...createTodoDto,
        user,
        completed: false,
        pomodoroCount: 0
      });

      const savedTodo = await this.todoRepository.save(todo);
      
      // 返回时排除敏感信息
      const { user: _, ...todoWithoutUser } = savedTodo;
      return todoWithoutUser;
    } catch (error) {
      console.error('Create todo error:', error);
      throw error;
    }
  }

  async findAll(userId: number) {
    return await this.todoRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const todo = await this.todoRepository.findOne({ 
        where: { id },
        relations: ['user'] 
      });
      
      if (!todo) {
        throw new NotFoundException('Todo not found');
      }

      // 更新字段
      Object.assign(todo, updateTodoDto);
      
      const savedTodo = await this.todoRepository.save(todo);
      
      // 返回时排除敏感信息
      const { user: _, ...todoWithoutUser } = savedTodo;
      return todoWithoutUser;
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

  async getStats(userId: number) {
    const todos = await this.todoRepository.find({
      where: { user: { id: userId } }
    });

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
      quadrantDistribution,
      weeklyCompletion,
      totalCount: todos.length,
      completedCount: todos.filter(t => t.completed).length,
      pomodoroStats: {
        dates: [], // 这里可以添加日期统计
        counts: [] // 这里可以添加番茄钟统计
      }
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