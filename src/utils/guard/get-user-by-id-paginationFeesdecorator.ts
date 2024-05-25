import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FeesPaginationDTO } from '../feesPaginationDTO';

export const GetCurrentUserByIdAndPaginationFees = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const queryPagination = { ...request.query, userId: request.user?.sub };
    const pagination = new FeesPaginationDTO(queryPagination);
    return { userId: request.user?.sub, ...pagination };
  },
);
