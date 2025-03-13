import { Controller, Get, Post, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { SubprocessService } from "./subprocess.service";

@Controller("subprocess")
export class SubprocessController {
  constructor(private readonly subprocessesService: SubprocessService) {}

  @Get()
  findAll() {
    return this.subprocessesService.findAll();
  }

  
  @Get("children")
  async findChildren(@Query('parentSubId') parentSubId?: string) {
    if (!parentSubId) return [];
    const idNum = parseInt(parentSubId, 10);
    return this.subprocessesService.findByParentSubId(idNum);
  }
  
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.subprocessesService.findOne(Number(id));
  }
  
  @Post()
  create(@Body() body: { nome: string; processId?: number; parentSubId?: number }) {
    return this.subprocessesService.create(body);
  }

  @Put(":id")
  async update(@Param("id") id: number, @Body() body: { nome: string }) {
    return this.subprocessesService.update(Number(id), body);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.subprocessesService.remove(Number(id));
  }
}
