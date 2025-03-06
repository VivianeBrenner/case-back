import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() body: { email: string; senha: string }) {
    const hashedPassword = await this.authService.hashPassword(body.senha);
    return { message: "Usuário registrado com sucesso!", senha: hashedPassword };
  }
}
