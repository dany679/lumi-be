import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SensorPaginationDTO } from '../sensorPaginationDTO';

export const GetCurrentUserByIdAndPaginationSensor = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('user id : ' + request.user.sub);
    const queryPagination = request.query;
    const pagination = new SensorPaginationDTO(queryPagination);
    return { userId: request.user?.sub, ...pagination };
  },
);
