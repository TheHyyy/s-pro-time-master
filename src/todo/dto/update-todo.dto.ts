import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { IsBoolean, IsOptional, Transform } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ description: '是否完成' })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  completed?: boolean;
} 