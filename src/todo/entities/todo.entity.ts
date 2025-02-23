import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  pomodoroCount: number;

  @Column({ default: 'important-urgent' })
  quadrant: string;

  @Column({ default: 4 })
  priority: number;

  @Column({ default: 0 })
  estimatedPomodoro: number;

  @Column({ type: 'datetime', nullable: true })
  estimatedEndDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}