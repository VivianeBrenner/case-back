import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProcessService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.process.findMany();
  }

  async create(data: Prisma.ProcessCreateInput) {
    return this.prisma.process.create({ data });
  }
}
