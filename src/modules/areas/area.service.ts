import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";

@Injectable()
export class AreaService {
  constructor(private prisma: PrismaService) {}

  async create(nome: string) {
    return this.prisma.area.create({ data: { nome } });
  }

  async findAll() {
    return this.prisma.area.findMany();
  }

  async update(id: number, nome: string) {
    const area = await this.prisma.area.findUnique({ where: { id } });
    if (!area) throw new NotFoundException("Área não encontrada.");

    return this.prisma.area.update({
      where: { id },
      data: { nome },
    });
  }

  async remove(id: number) {
    const area = await this.prisma.area.findUnique({ where: { id } });
    if (!area) throw new NotFoundException("Área não encontrada.");

    return this.prisma.area.delete({ where: { id } });
  }
}
