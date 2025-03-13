import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";

@Injectable()
export class SubprocessService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.subprocess.findMany({
      include: { subprocesses: true },
    });
  }

  async findOne(id: number) {
    const subprocess = await this.prisma.subprocess.findUnique({
      where: { id },
      include: {
        subprocesses: {
          include: {
            subprocesses: {
              include: {
                subprocesses: true,
              },
            },
          },
        },
      },
    });
    if (!subprocess) throw new NotFoundException("Subprocesso não encontrado.");
    return subprocess;
  }

  async findByParentSubId(parentSubId: number | null) {
    return this.prisma.subprocess.findMany({
      where: { parentSubId },
    });
  }

  async create(data: { nome: string; processId?: number; parentSubId?: number }) {
    if (data.parentSubId) {
      return this.prisma.subprocess.create({
        data: {
          nome: data.nome,
          parentSub: {
            connect: { id: data.parentSubId },
          },
        },
      });
    } 
    else if (data.processId) {
      return this.prisma.subprocess.create({
        data: {
          nome: data.nome,
          process: {
            connect: { id: data.processId },
          },
        },
      });
    } else {
      throw new Error("É necessário fornecer processId ou parentSubId.");
    }
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
