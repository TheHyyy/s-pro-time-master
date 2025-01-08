import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T = any> {
  @ApiProperty({ description: '是否成功' })
  success: boolean;

  @ApiProperty({ description: '状态码' })
  code: number;

  @ApiProperty({ description: '数据' })
  data: T;

  @ApiProperty({ description: '消息' })
  msg: string;

  @ApiProperty({ description: '时间戳' })
  timestamp: number;
}
