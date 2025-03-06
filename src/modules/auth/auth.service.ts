import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(body: { nome: string; email: string; senha: string; confirmarSenha: string }) {
    if (body.senha !== body.confirmarSenha) {
      throw new BadRequestException("As senhas não coincidem.");
    }

    const hashedPassword = await bcrypt.hash(body.senha, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          nome: body.nome,
          email: body.email,
          senha: hashedPassword,
        },
      });

      return { id: newUser.id, email: newUser.email, nome: newUser.nome };
    } catch (error) {
      throw new BadRequestException("Erro ao criar usuário. Verifique se o email já está cadastrado.");
    }
  }

  async validateUser(email: string, senha: string): Promise<string | null> {
    if (!email || !senha) {
      throw new UnauthorizedException("Email e senha são obrigatórios.");
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Senha incorreta");
    }

    const token = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: "1h" }
    );

    return token;
  }
}
