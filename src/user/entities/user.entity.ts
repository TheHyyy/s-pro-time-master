import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: string;

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];

  @BeforeInsert()
  updateDateOnInsert() {
    this.createdAt = new Date().toISOString();
  }
} 