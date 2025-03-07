import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";

@Injectable()
export class SubprocessService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subprocess.findMany();
  }

  async findOne(id: number) {
    const subprocess = await this.prisma.subprocess.findUnique({ where: { id } });
    if (!subprocess) throw new NotFoundException("Subprocesso não encontrado.");
    return subprocess;
  }

  async create(data: { nome: string; processoId: number }) {
    return this.prisma.subprocess.create({
      data: {
        nome: data.nome,
        process: {
          connect: { id: data.processoId }
        }
      }
    });
  }

  async update(id: number, data: { nome: string }) {
    const subprocess = await this.prisma.subprocess.findUnique({ where: { id } });
    if (!subprocess) throw new NotFoundException("Subprocesso não encontrado.");

    return this.prisma.subprocess.update({ where: { id }, data });
  }

  async remove(id: number) {
    const subprocess = await this.prisma.subprocess.findUnique({ where: { id } });
    if (!subprocess) throw new NotFoundException("Subprocesso não encontrado.");

    return this.prisma.subprocess.delete({ where: { id } });
  }
}
