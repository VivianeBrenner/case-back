import { Module } from "@nestjs/common";
import { AreaController } from "./area.controller";
import { AreaService } from "./area.service";
import { PrismaService } from "../../config/prisma.service";

@Module({
  controllers: [AreaController],
  providers: [AreaService, PrismaService],
})
export class AreaModule {}
