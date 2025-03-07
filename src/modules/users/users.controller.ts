import { Controller, Get, Put, Param, Body, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(":id/role")
  updateRole(@Param("id", ParseIntPipe) id: number, @Body() body: { role: string }) {
    return this.usersService.updateRole(id, body.role);
  }
}
