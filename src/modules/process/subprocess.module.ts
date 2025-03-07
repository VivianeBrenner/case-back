import { Module } from "@nestjs/common";
import { SubprocessService } from "./subprocess.service";
import { SubprocessController } from "./subprocess.controller";
import { PrismaService } from "../../config/prisma.service";

@Module({
  controllers: [SubprocessController],
  providers: [SubprocessService, PrismaService],
})
export class SubprocessModule {}
