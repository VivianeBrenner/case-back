import { Module } from "@nestjs/common";
import { SubprocessController } from "./subprocess.controller";
import { SubprocessService } from "./subprocess.service";
import { PrismaService } from "../../config/prisma.service";

@Module({
  controllers: [SubprocessController],
  providers: [SubprocessService, PrismaService],
})
export class SubprocessModule {}
