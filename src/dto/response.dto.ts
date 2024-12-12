import { ApiProperty } from '@nestjs/swagger';
import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums';

export class ResponseDto {
  @ApiProperty({
    type: Boolean,
    description: '操作是否成功',
    default: true,
  })
  success: boolean; // 表示操作是否成功

  @ApiProperty({
    type: Number,
    description: '业务状态码',
    default: RESPONSE_CODE.SUCCESS,
  })
  code: number; // 表示业务状态码，用于细化业务逻辑

  @ApiProperty({
    type: String,
    description: '业务信息',
    default: RESPONSE_MSG.SUCCESS,
  })
  msg: string; // 操作的结果描述

  @ApiProperty({
    description: '业务数据',
    nullable: true,
  })
  data?: any; // 业务数据，可能为 undefined 或具体内容

  @ApiProperty({
    type: Number,
    description: '时间戳',
    default: Date.now(),
    required: false, // 如果决定不保留 timestamp，可以将其设为可选
  })
  timestamp?: number; // 时间戳，标记返回数据的时间
}
