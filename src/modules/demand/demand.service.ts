import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PaginationDTO } from 'src/utils/dto';
import { CreateDemandDto } from './dto/create-demand.dto';
import { UpdateDemandDto } from './dto/update-demand.dto';

@Injectable()
export class DemandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDemandDto) {
    const demand = await this.prisma.demand.create({
      data: {
        status: data?.status ?? 'EM ANDAMENTO',
        start_at: new Date(data.start_at),
        finish_at: new Date(data.finish_at),
      },
    });
    return demand;
  }

  async findAll(pagination: PaginationDTO) {
    const demands = await this.prisma.demand.findMany({
      select: {
        id: true,
        start_at: true,
        finish_at: true,
        status: true,
        _count: true,
        DemandsProducts: {
          select: {
            total_plan: true,
            total_prod: true,
          },
        },
      },
      orderBy: {
        start_at: 'desc',
      },
      skip: pagination.skip,
      take: pagination.limit,
    });

    const count = await this.prisma.demand.count();

    pagination.count = count;
    return { demands, pagination };
  }

  async findOne(id: number) {
    const exist = await this.prisma.demand.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this demand doest not exist');
    }
    return exist;
  }

  async update(id: number, data: UpdateDemandDto) {
    console.log(data, 'DATA');
    const exist = await this.prisma.demand.update({ where: { id }, data });

    if (!exist) {
      throw new Error('this demand doest not exist');
    }
    const demand = await this.prisma.demand.update({
      where: { id },
      data,
    });
    return demand;
  }

  async remove(id: number) {
    const exist = await this.prisma.demand.findUnique({ where: { id } });
    if (!exist) {
      throw new Error('this demand doest not exist');
    }
    await this.prisma.demandsProducts.deleteMany({ where: { demandId: id } });
    await this.prisma.demand.delete({ where: { id } });
  }
}
