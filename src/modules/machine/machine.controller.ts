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
import { IPaginationPage, uuidDTO } from 'src/utils/dto';
import { GetCurrentUserByIdAndPagination } from 'src/utils/guard/get-user-by-id-pagination.decorator';
import { GetCurrentUserById } from 'src/utils/guard/get-user-by-id.decorator';
import { CreateMachineBodyDto } from './dto/create-machine.dto';
import { UpdateProductDto } from './dto/update-machine.dto';
import { MachineEntity } from './entities/machine.entity';
import { MachineService } from './machine.service';

@Controller('machines')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetCurrentUserById() id: string,
    @Body() createProductDto: CreateMachineBodyDto,
  ): Promise<MachineEntity | null> {
    // console.log(id);
    return new MachineEntity(
      await this.machineService.create({ userId: id, ...createProductDto }),
    );
  }

  @Get()
  findAll(@GetCurrentUserByIdAndPagination() queryPagination: IPaginationPage) {
    return this.machineService.findAll(queryPagination as IPaginationPage);
  }

  @Get(':id')
  findOne(@Param() { id }: uuidDTO, @GetCurrentUserById() userId: string) {
    return this.machineService.findOne(userId, id);
  }

  @HttpCode(201)
  @Put(':id')
  update(
    @Param() { id }: uuidDTO,
    @Body() updateProductDto: UpdateProductDto,
    @GetCurrentUserById() userId: string,
  ) {
    return this.machineService.update(userId, id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() { id }: uuidDTO, @GetCurrentUserById() userId: string) {
    return this.machineService.remove(userId, id);
  }
}
