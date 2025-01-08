import { ResponseDto } from '../dto/response.dto';

export const responseMessage = <T>(data: T, msg = '操作成功'): ResponseDto<T> => {
  return {
    success: true,
    code: 200,
    data,
    msg,
    timestamp: Date.now(),
  };
};
