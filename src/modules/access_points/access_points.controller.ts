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
import { GetCurrentUserByIdAndPaginationSensor } from 'src/utils/guard/get-user-by-id-paginationSensor.decorator';
import { GetCurrentUserById } from 'src/utils/guard/get-user-by-id.decorator';
import { IPaginationSensor } from 'src/utils/sensorPaginationDTO';
import { AccessPointsService } from './access_points.service';
import { CreateAccessPointsBody } from './dto/create-access_points.dto';
import { UpdateAccessPoints } from './dto/update-access_points.dto';
import { AccessPointsEntity } from './entities/access_points.entity';

@Controller('access_points')
export class AccessPointsController {
  constructor(private readonly accessPointService: AccessPointsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUserById() id: string,
    @Body() createProductDto: CreateAccessPointsBody,
  ): Promise<AccessPointsEntity | null> {
    return new AccessPointsEntity(
      await this.accessPointService.create({ ...createProductDto, userId: id }),
    );
  }

  @Get()
  findAll(
    @GetCurrentUserByIdAndPaginationSensor() pagination: IPaginationSensor,
  ) {
    return this.accessPointService.findAll(pagination as IPaginationSensor);
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
