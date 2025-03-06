import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProcessService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.process.findMany();
  }

  async findOne(id: number) {
    const process = await this.prisma.process.findUnique({ where: { id } });
    if (!process) throw new NotFoundException("Processo não encontrado.");
    return process;
  }

  async create(data: Prisma.ProcessCreateInput) {
    return this.prisma.process.create({ data });
  }

  async update(id: number, data: Partial<Prisma.ProcessCreateInput>) {
    const process = await this.prisma.process.findUnique({ where: { id } });
    if (!process) throw new NotFoundException("Processo não encontrado.");
  
    return this.prisma.process.update({ where: { id }, data });
  }  

  async remove(id: number) {
    const process = await this.prisma.process.findUnique({ where: { id } });
    if (!process) throw new NotFoundException("Processo não encontrado.");

    return this.prisma.process.delete({ where: { id } });
  }
}
