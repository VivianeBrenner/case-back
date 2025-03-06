import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { PrismaService } from '../../config/prisma.service';

@Module({
  providers: [ProcessService, PrismaService],
  controllers: [ProcessController],
  exports: [ProcessService],
})
export class ProcessModule {}
