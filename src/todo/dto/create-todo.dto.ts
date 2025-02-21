import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: '任务标题' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '任务描述' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: '四象限类型' })
  @IsString()
  @IsNotEmpty()
  quadrant: string;
} 