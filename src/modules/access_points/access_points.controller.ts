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
  Query,
} from '@nestjs/common';
import { uuidDTO } from 'src/utils/dto';
import {
  IPaginationSensor,
  SensorPaginationDTO,
} from 'src/utils/sensorPaginationDTO';
import { AccessPointsService } from './access_points.service';
import { CreateAccessPoints } from './dto/create-access_points.dto';
import { UpdateAccessPoints } from './dto/update-access_points.dto';
import { AccessPointsEntity } from './entities/access_points.entity';

@Controller('access_points')
export class AccessPointsController {
  constructor(private readonly accessPointService: AccessPointsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: CreateAccessPoints,
  ): Promise<AccessPointsEntity | null> {
    return new AccessPointsEntity(
      await this.accessPointService.create(createProductDto),
    );
  }

  @Get()
  findAll(@Query() queryPagination: IPaginationSensor) {
    const pagination = new SensorPaginationDTO(queryPagination);

    return this.accessPointService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param() { id }: uuidDTO) {
    return this.accessPointService.findOne(id);
  }

  @HttpCode(201)
  @Put(':id')
  update(
    @Param() { id }: uuidDTO,
    @Body() updateProductDto: UpdateAccessPoints,
  ) {
    return this.accessPointService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() { id }: uuidDTO) {
    return this.accessPointService.remove(id);
  }
}
