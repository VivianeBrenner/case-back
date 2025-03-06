import { Controller, Get, Post, Body } from "@nestjs/common";
import { ProcessService } from "./process.service";

@Controller("process")
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  findAll() {
    return this.processService.findAll();
  }

  @Post()
  create(@Body() body: { nome: string; status: string }) {
    return this.processService.create(body);
  }
}
