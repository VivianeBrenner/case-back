import { Controller, Post, Body, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() body: { nome: string; email: string; senha: string; confirmarSenha: string }
  ) {
    if (!body.nome || !body.email || !body.senha || !body.confirmarSenha) {
      throw new BadRequestException("Todos os campos são obrigatórios.");
    }

    if (body.senha !== body.confirmarSenha) {
      throw new BadRequestException("As senhas não coincidem.");
    }

    const user = await this.authService.register(body);
    return { message: "Usuário registrado com sucesso!", user };
  }

  @Post("login")
  async login(@Body() body: { email: string; senha: string }) {
    if (!body.email || !body.senha) {
      throw new UnauthorizedException("Email e senha são obrigatórios.");
    }

    const token = await this.authService.validateUser(body.email, body.senha);
    if (!token) {
      throw new UnauthorizedException("Credenciais inválidas");
    }
    return { access_token: token };
  }
}
