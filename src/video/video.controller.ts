import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { join } from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Video } from './entities/video.model';
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: '/uploads' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    console.log(file);

    return this.videoService.uploadFile(file); // Delegate to the FileService
  }
  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 1000, { dest: '/uploads' }))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    const uploadedVideos = await this.videoService.uploadFiles(files);
    return uploadedVideos;
  }
  @Get(':id')
  async serveFile(@Param('id') id: string): Promise<any> {
    return this.videoService.serveFile(id); // Delegate to the FileService
  }

  @Get()
  async serveAllFiles(): Promise<string[]> {
    return this.videoService.serveAllFiles(); // Delegate to the FileService
  }
}
