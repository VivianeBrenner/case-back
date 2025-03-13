import { Injectable } from "@nestjs/common";
import { join } from "path";
import { existsSync, unlinkSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

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

  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    };
  }
}
