import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMenuDto) {
    const exist = await this.prisma.menu.findUnique({
      where: { menuTime: data.menuTime },
    });
    if (!exist) {
      throw new Error(`'this menu ${data.menuTime} already not exist'`);
    }
    return await this.prisma.$transaction(async (tx) => {
      const menu = await this.prisma.menu.create({
        data: {
          menuTime: data.menuTime,
        },
      });
      await this.prisma.product.updateMany({
        where: {
          id: { in: data.products },
        },
        data: {
          menuId: menu.id,
        },
      });
      return menu;
    });
  }

  async findAll() {
    const categories = await this.prisma.menu.findMany({
      select: {
        menuTime: true,
        id: true,
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return categories;
  }

  async findOne(id: string) {
    const exist = await this.prisma.menu.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this menu doest not exist');
    }
    const categories = await this.prisma.menu.findUnique({
      where: { id },
      select: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            kg: true,
            description: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return categories;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const exist = await this.prisma.menu.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this menu doest not exist');
    }

    const menuTransaction = await this.prisma.$transaction(async (tx) => {
      const menu =
        updateMenuDto.menuTime &&
        (await this.prisma.menu.update({
          where: { id },
          data: {
            menuTime: updateMenuDto.menuTime,
          },
        }));

      await this.prisma.product.updateMany({
        where: {
          menuId: id,
        },
        data: {
          menuId: null,
        },
      });
      const productsAdd = await this.prisma.product.updateMany({
        where: {
          id: { in: updateMenuDto.products },
        },
        data: {
          menuId: id,
        },
      });

      return menu;
    });
    return menuTransaction ?? exist;
  }

  async remove(id: string) {
    const exist = await this.prisma.menu.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this menu doest not exist');
    }
    return await this.prisma.$transaction(async (tx) => {
      const menu = await this.prisma.menu.delete({
        where: { id },
      });

      await this.prisma.product.updateMany({
        where: {
          menuId: id,
        },
        data: {
          menuId: null,
        },
      });

      return { menu };
    });
  }
}
