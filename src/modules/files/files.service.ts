import { Injectable } from "@nestjs/common";
import { join } from "path";
import { existsSync, unlinkSync } from "fs";

@Injectable()
export class FilesService {

  deleteFile(filename: string): boolean {
    const filePath = join(__dirname, "../../../uploads", filename);

    if (existsSync(filePath)) {
      unlinkSync(filePath);
      return true;
    }
    return false;
  }

 
  getFilePath(filename: string): string {
    return join(__dirname, "../../../uploads", filename);
  }
}
