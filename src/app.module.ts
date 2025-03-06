import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProcessModule } from "./modules/process/process.module";
import { FilesModule } from "./modules/files/files.module";

@Module({
  imports: [AuthModule, UsersModule, ProcessModule, FilesModule],
})
export class AppModule {}
