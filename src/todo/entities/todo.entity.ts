import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 4 })
  priority: number;

  @Column({ default: 1 })
  estimatedPomodoros: number;

  @Column({ default: 0 })
  completedPomodoros: number;

  @Column({ nullable: true })
  dueDate: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @ManyToOne(() => User, user => user.todos)
  user: User;

  @BeforeInsert()
  updateDatesOnInsert() {
    const now = new Date().toISOString();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  updateDatesOnUpdate() {
    this.updatedAt = new Date().toISOString();
  }
} 