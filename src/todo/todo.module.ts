import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller'; // 引入控制器
import { TodoService } from './todo.service';       // 引入服务

@Module({
  controllers: [TodoController], // 注册控制器
  providers: [TodoService],      // 注册服务
})
export class TodoModule {}
