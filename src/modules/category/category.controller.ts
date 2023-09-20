import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { idDTO } from 'src/utils/dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<any[] | null> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: idDTO) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  update(@Param() { id }: idDTO, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param() { id }: idDTO) {
    return this.categoryService.remove(id);
  }
}
