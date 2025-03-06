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
  import { Express } from "express";
  import { Multer } from "multer";
  import { FilesService } from "./files.service";
  import { Response } from "express";
  import { existsSync, createReadStream } from "fs";
  
  @Controller("files")
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @Post("upload")
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return {
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
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
  