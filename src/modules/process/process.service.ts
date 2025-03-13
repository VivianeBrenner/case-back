import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProcessService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
   
    return this.prisma.process.findMany({
      include: {
        area: true,
        subprocesses: true,
      },
    });
  }

  async findOne(id: number) {
    const process = await this.prisma.process.findUnique({
      where: { id },
      include: {
        area: true,
        subprocesses: true, 
      },
    });
    if (!process) throw new NotFoundException("Processo não encontrado.");
    return process;
  }

  async create(data: Prisma.ProcessCreateInput) {
    
    return this.prisma.process.create({
      data,
      include: {
        area: true,
        subprocesses: true,
      },
    });
  }

  async update(id: number, data: Prisma.ProcessUpdateInput) {
    const process = await this.prisma.process.findUnique({ where: { id } });
    if (!process) throw new NotFoundException("Processo não encontrado.");

    return this.prisma.process.update({
      where: { id },
      data,
      include: {
        area: true,
        subprocesses: true,
      },
    });
  }

  async remove(id: number) {
    const process = await this.prisma.process.findUnique({ where: { id } });
    if (!process) throw new NotFoundException("Processo não encontrado.");

    return this.prisma.process.delete({ where: { id } });
  }
}
