import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IPagination, PaginationDTO } from 'src/utils/dto';
import { DemandsProductsService } from './demands_products.service';
import { CreateDemandsProductDto } from './dto/create-demands_product.dto';
import { UpdateDemandsProductDto } from './dto/update-demands_product.dto';

@Controller('demands-products')
export class DemandsProductsController {
  constructor(
    private readonly demandsProductsService: DemandsProductsService,
  ) {}

  @Post()
  create(@Body() createDemandsProductDto: CreateDemandsProductDto) {
    return this.demandsProductsService.create(createDemandsProductDto);
  }

  @Get(':id')
  findAll(@Query() queryPagination: IPagination, @Param('id') id: number) {
    const pagination = new PaginationDTO(queryPagination);
    return this.demandsProductsService.findAll(pagination, id);
  }

  @Put(':id')
  @HttpCode(201)
  update(
    @Param('id') id: number,
    @Body()
    data: {
      demandsProducts: UpdateDemandsProductDto[];
      idsToDelete?: number[] | [];
    },
  ) {
    const { demandsProducts, idsToDelete } = data;
    return this.demandsProductsService.update(id, demandsProducts, idsToDelete);
  }
}
