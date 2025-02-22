import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: '任务标题' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '优先级', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  priority: number;

  @ApiProperty({ description: '预计番茄钟数量', example: 0 })
  @IsNumber()
  @IsOptional()
  estimatedPomodoro?: number;

  @ApiProperty({ description: '预计结束日期' })
  @IsString()
  @IsOptional()
  estimatedEndDate?: string;

  @ApiProperty({ description: '是否完成' })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}