import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express, Response } from "express";
import { FilesService } from "./files.service";
import { diskStorage } from "multer";
import { existsSync, createReadStream } from "fs";
import { extname } from "path";

const multerConfig = {
  storage: diskStorage({
    destination: "./uploads", 
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, 
};

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error("Nenhum arquivo enviado.");
    }

    return {
      filename: file.filename,
      originalname: file.originalname,
      path: `/uploads/${file.filename}`,
    };
  }

  @Post("download/:filename")
  async downloadFile(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = this.filesService.getFilePath(filename);

    if (!existsSync(filePath)) {
      return res.status(404).json({ message: "Arquivo não encontrado" });
    }

    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  }

  @Delete("delete/:filename")
  async deleteFile(@Param("filename") filename: string) {
    const deleted = this.filesService.deleteFile(filename);
    return deleted
      ? { message: "Arquivo deletado com sucesso" }
      : { message: "Arquivo não encontrado" };
  }
}
