import dayjs from 'dayjs';
import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums'; // 响应码和提示语的枚举
import type { Response } from '@/types'; // 引入响应类型
/**
 * @description: 统一返回体格式
 */
export const responseMessage = <T = any>(
  data: T,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): Response<T> => ({
  data, // 业务数据
  msg, // 响应信息
  code, // 状态码
  timestamp: dayjs().valueOf(), // 当前时间戳
});
