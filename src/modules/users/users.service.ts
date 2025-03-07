import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import { Prisma, UserRole } from "@prisma/client"; 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateRole(id: number, role: string) {
    role = role.toUpperCase();

    if (!Object.values(UserRole).includes(role as UserRole)) {
      throw new BadRequestException("Role inválida. Deve ser 'ADMIN', 'MANAGER' ou 'USER'.");
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("Usuário não encontrado.");

    return this.prisma.user.update({
      where: { id },
      data: { role: role as UserRole },
    });
  }
}

