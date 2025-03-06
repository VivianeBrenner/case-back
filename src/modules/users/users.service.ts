import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }
}
