// file-upload.dto.ts
import { IsArray, IsOptional } from 'class-validator';
import { Express } from 'express';

export class FileUploadDto {
  @IsArray()
  @IsOptional()
  files: Express.Multer.File[];
}
