import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async getTodoById(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id } });
  }

  async createTodo(todoData: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepository.create(todoData);
    return await this.todoRepository.save(todo);
  }

  async updateTodo(id: number, todoData: Partial<Todo>): Promise<Todo> {
    await this.todoRepository.update(id, todoData);
    return await this.getTodoById(id);
  }

  async deleteTodoById(id: number): Promise<boolean> {
    const result = await this.todoRepository.delete(id);
    return result.affected > 0;
  }

  async findOne(id: number): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id } });
  }

  async updatePomodoros(id: number): Promise<Todo> {
    const todo = await this.findOne(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    todo.completedPomodoros += 1;
    
    if (todo.completedPomodoros >= todo.estimatedPomodoros) {
      todo.completed = true;
    }
    
    return await this.todoRepository.save(todo);
  }

  async getTodoStats(userId?: number) {
    const queryBuilder = this.todoRepository.createQueryBuilder('todo');
    
    if (userId) {
      queryBuilder.where('todo.userId = :userId', { userId });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await queryBuilder
      .select([
        'COUNT(*) as totalTodos',
        'SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) as completedTodos',
        'SUM(completedPomodoros) as totalPomodoros',
      ])
      .where('createdAt >= :today', { today })
      .getRawOne();

    return stats;
  }
}