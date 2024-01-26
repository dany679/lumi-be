import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IPagination, PaginationDTO, idDTO } from 'src/utils/dto';
import { DemandService } from './demand.service';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';

@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @Post()
  create(@Body() createDemandDto: CreateDemandDto) {
    return this.demandService.create(createDemandDto);
  }

  // @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Query() queryPagination: IPagination) {
    const pagination = new PaginationDTO(queryPagination);
    return this.demandService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param() { id }: idDTO) {
    return this.demandService.findOne(+id);
  }

  @Put(':id')
  @HttpCode(201)
  update(@Param() { id }: idDTO, @Body() updateDemandDto: UpdateDemandDto) {
    return this.demandService.update(+id, updateDemandDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() { id }: idDTO) {
    return this.demandService.remove(+id);
  }
}
