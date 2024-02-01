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
import { IPagination, PaginationDTO, uuidDTO } from 'src/utils/dto';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateProductDto } from './dto/update-machine.dto';
import { MachineEntity } from './entities/machine.entity';
import { MachineService } from './machine.service';

@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createProductDto: CreateMachineDto,
  ): Promise<MachineEntity | null> {
    return new MachineEntity(
      await this.machineService.create(createProductDto),
    );
  }

  @Get()
  findAll(@Query() queryPagination: IPagination) {
    const pagination = new PaginationDTO(queryPagination);

    return this.machineService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param() { id }: uuidDTO) {
    return this.machineService.findOne(id);
  }

  @HttpCode(201)
  @Put(':id')
  update(@Param() { id }: uuidDTO, @Body() updateProductDto: UpdateProductDto) {
    return this.machineService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() { id }: uuidDTO) {
    return this.machineService.remove(id);
  }
}
