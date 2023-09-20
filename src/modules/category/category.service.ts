import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        name: data.name,
      },
    });
    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        Product: {
          select: {
            id: true,
            name: true,
            price: true,
            kg: true,
            description: true,
          },
        },
      },
    });
    return categories;
  }

  async findOne(id: string) {
    const categories = await this.prisma.category.findUnique({
      where: { id },
      include: {
        Product: true,
      },
    });
    return categories;
  }

  async update(id: string, data: UpdateCategoryDto) {
    const exist = await this.prisma.category.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this category doest not exist');
    }
    const category = await this.prisma.$transaction(async (tx) => {
      await this.prisma.product.updateMany({
        where: { categoryId: id },
        data: {
          categoryId: undefined,
        },
      });
      await this.prisma.product.updateMany({
        where: { id: { in: data.products } },
        data: {
          categoryId: id,
        },
      });
      const categoryUp = await this.prisma.category.update({
        where: { id },
        data: { name: data.name },
      });
      return categoryUp;
    });
    return category;
  }

  async remove(id: string) {
    const exist = await this.prisma.category.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this category doest not exist');
    }
    const category = await this.prisma.$transaction(async (tx) => {
      await this.prisma.product.updateMany({
        where: { categoryId: id },
        data: {
          categoryId: undefined,
        },
      });
      await this.prisma.category.delete({
        where: { id },
      });
    });
    return category;
  }
}
