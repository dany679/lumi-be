import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserAuthDto } from '../auth/dto/create-user-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserAuthDto) {
    console.log(data, 'AAAAAAAAAAAAAAAAAAAAA');
    return await this.prisma.user.create({ data });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
