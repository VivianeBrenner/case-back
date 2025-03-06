import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ProcessService } from "./process.service";

@Controller("process")
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  findAll() {
    return this.processService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.processService.findOne(parseInt(id));
  }

  @Post()
  create(@Body() body: { nome: string; status: string }) {
    return this.processService.create(body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: Partial<{ nome: string; status: string }>) {
    return this.processService.update(parseInt(id), body);  
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.processService.remove(parseInt(id));
  }
}
