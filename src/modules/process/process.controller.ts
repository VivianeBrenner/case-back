import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { ProcessService } from "./process.service";
import { Prisma } from "@prisma/client";

@Controller("process")
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get()
  findAll() {

    return this.processService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
 
    return this.processService.findOne(id);
  }

  @Post()
  create(@Body() body: Prisma.ProcessCreateInput) {
  
    return this.processService.create(body);
  }

  @Put(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() body: Partial<Prisma.ProcessCreateInput>) {
 
    return this.processService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.processService.remove(id);
  }
}
