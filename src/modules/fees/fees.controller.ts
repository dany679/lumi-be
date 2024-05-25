import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { uuidDTO } from 'src/utils/dto';
import { GetCurrentUserById } from 'src/utils/guard/get-user-by-id.decorator';
import { IPaginationFees } from '../../utils/feesPaginationDTO';
import { GetCurrentUserByIdAndPaginationFees } from '../../utils/guard/get-user-by-id-paginationFeesdecorator';
import { CreateFeesBody } from './dto/create_fees.dto';
import { UpdateAccessPoints } from './dto/update_fees.dto';
import { FeesEntity } from './entities/fees.entity';
import { FeesService } from './fees.service';

@Controller('fees')
export class FeesController {
  constructor(private readonly accessPointService: FeesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUserById() id: string,
    @Body() createProductDto: CreateFeesBody,
  ): Promise<FeesEntity | null> {
    return new FeesEntity(
      await this.accessPointService.create({ ...createProductDto, userId: id }),
    );
  }

  @Get()
  findAll(@GetCurrentUserByIdAndPaginationFees() pagination: IPaginationFees) {
    return this.accessPointService.findAll(pagination as IPaginationFees);
  }
  @Get('dashboard')
  dashboardFees(@GetCurrentUserById() userId: string) {
    return this.accessPointService.dashboardFees(userId);
  }

  @Get(':id')
  findOne(@Param() { id }: uuidDTO, @GetCurrentUserById() userId: string) {
    return this.accessPointService.findOne(userId, id);
  }

  @HttpCode(201)
  @Put(':id')
  update(
    @Param() { id }: uuidDTO,
    @Body() updateProductDto: UpdateAccessPoints,
    @GetCurrentUserById() userId: string,
  ) {
    return this.accessPointService.update(userId, id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() { id }: uuidDTO, @GetCurrentUserById() userId: string) {
    return this.accessPointService.remove(userId, id);
  }
}
