import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IPaginationPage } from 'src/utils/dto';
import { MachineHttpStatus } from 'src/utils/erros/machines.enum.error';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateProductDto } from './dto/update-machine.dto';
import { MachineEntity } from './entities/machine.entity';

@Injectable()
export class MachineService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateMachineDto): Promise<MachineEntity | null> {
    const machine = await this.prisma.machine.create({ data });

    return new MachineEntity(machine);
  }

  async findAll(pagination: IPaginationPage) {
    const machines = await this.prisma.machine.findMany({
      where: { userId: pagination.userId },
      select: {
        id: true,
        name: true,
        type: true,
      },
      skip: pagination.skip,
      take: pagination.limit,
    });
    const count = await this.prisma.machine.count();
    pagination.count = count;

    // pagination.prev = pagination.page>1&& count>0 ;
    pagination.next = count - pagination.skip > pagination.limit;

    return { machines, pagination };
  }

  async findOne(userId: string, id: string) {
    const machine = await this.prisma.machine.findUnique({ where: { id } });
    if (!machine) {
      throw new HttpException(
        MachineHttpStatus.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    if (machine.userId !== userId) {
      throw new HttpException(
        MachineHttpStatus.NOT_ALLOW,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    return machine;
  }

  async update(userId: string, id: string, updateProductDto: UpdateProductDto) {
    const exist = await this.prisma.machine.findUnique({ where: { id } });
    if (!exist) {
      throw new HttpException(
        MachineHttpStatus.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    if (exist.userId !== userId) {
      throw new HttpException(
        MachineHttpStatus.NOT_ALLOW,
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
    const machine = await this.prisma.machine.update({
      where: { id },
      data: updateProductDto,
    });
    return machine;
  }

  async remove(userId: string, id: string) {
    const exist = await this.prisma.machine.findUnique({ where: { id } });
    const conflictAc = await this.prisma.accessPoint.findFirst({
      where: { machineId: id },
    });
    if (!exist) {
      throw new HttpException(
        MachineHttpStatus.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    if (exist.userId !== userId) {
      throw new HttpException(
        MachineHttpStatus.NOT_ALLOW,
        HttpStatus.NOT_FOUND,
      );
    }
    if (conflictAc) {
      throw new HttpException(
        MachineHttpStatus.CONFLICT_AC,
        HttpStatus.CONFLICT,
      );
    }
    await this.prisma.machine.delete({
      where: { id },
    });
    return null;
  }
}
