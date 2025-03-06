import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";

@Injectable()
export class SubprocessService {
  constructor(private prisma: PrismaService) {}

  async createSubprocess(processId: number, nome: string) {
    return this.prisma.subprocess.create({
      data: { nome, processId },
    });
  }

  async getSubprocesses(processId: number) {
    return this.prisma.subprocess.findMany({ where: { processId } });
  }

  async updateSubprocess(processId: number, subId: number, nome: string) {
    const subprocess = await this.prisma.subprocess.findUnique({ where: { id: subId, processId } });
    if (!subprocess) throw new NotFoundException("Subprocesso não encontrado.");

    return this.prisma.subprocess.update({
      where: { id: subId },
      data: { nome },
    });
  }

  async deleteSubprocess(processId: number, subId: number) {
    const subprocess = await this.prisma.subprocess.findUnique({ where: { id: subId, processId } });
    if (!subprocess) throw new NotFoundException("Subprocesso não encontrado.");

    return this.prisma.subprocess.delete({ where: { id: subId } });
  }
}
