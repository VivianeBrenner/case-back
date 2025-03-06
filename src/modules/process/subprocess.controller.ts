import { Controller, Post, Get, Put, Delete, Param, Body, NotFoundException } from "@nestjs/common";
import { SubprocessService } from "./subprocess.service";

@Controller("process/:processId/subprocess")
export class SubprocessController {
  constructor(private readonly subprocessService: SubprocessService) {}

  @Post()
  create(@Param("processId") processId: number, @Body() body: { nome: string }) {
    return this.subprocessService.createSubprocess(processId, body.nome);
  }

  @Get()
  findAll(@Param("processId") processId: number) {
    return this.subprocessService.getSubprocesses(processId);
  }

  @Put(":subId")
  update(
    @Param("processId") processId: number,
    @Param("subId") subId: number,
    @Body() body: { nome: string }
  ) {
    return this.subprocessService.updateSubprocess(processId, subId, body.nome);
  }

  @Delete(":subId")
  remove(@Param("processId") processId: number, @Param("subId") subId: number) {
    return this.subprocessService.deleteSubprocess(processId, subId);
  }
}
