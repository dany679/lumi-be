import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDTO } from '../dto';

export const GetCurrentUserByIdAndPagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('user id : ' + request.user.sub);
    const queryPagination = request.query;
    const pagination = new PaginationDTO(queryPagination);
    return { userId: request.user?.sub, ...pagination };
  },
);
