import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { AreaService } from "./area.service";

@Controller("areas")
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post()
  create(@Body() body: { nome: string }) {
    return this.areaService.create(body.nome);
  }

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: { nome: string }) {
    return this.areaService.update(Number(id), body.nome); 
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.areaService.remove(id);
  }
}
