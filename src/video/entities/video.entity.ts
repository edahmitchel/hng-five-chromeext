export class Video {}
// import {
//     Controller,
//     Get,
//     Post,
//     Body,
//     Patch,
//     Param,
//     Delete,
//     UseInterceptors,
//     UploadedFiles,
//     UploadedFile,
//   } from '@nestjs/common';
//   import { VideoService } from './video.service';
//   import { CreateVideoDto } from './dto/create-video.dto';
//   import { UpdateVideoDto } from './dto/update-video.dto';
//   import { join } from 'path';
//   import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
//   import { v4 as uuidv4 } from 'uuid';
//   import * as fs from 'fs';
//   @Controller('video')
//   export class VideoController {
//     constructor(private readonly videoService: VideoService) {}

//     @Post()
//     create(@Body() createVideoDto: CreateVideoDto) {
//       return this.videoService.create(createVideoDto);
//     }

//     @Get()
//     findAll() {
//       return this.videoService.findAll();
//     }

//     @Get(':id')
//     findOne(@Param('id') id: string) {
//       return this.videoService.findOne(+id);
//     }

//     @Patch(':id')
//     update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
//       return this.videoService.update(+id, updateVideoDto);
//     }

//     @Delete(':id')
//     remove(@Param('id') id: string) {
//       return this.videoService.remove(+id);
//     }

//     @Post('upload')
//     @UseInterceptors(FileInterceptor('file', { dest: '/uploads' }))
//     async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
//       // console.log(body.file);
//       console.log(file);

//       // const files: Express.Multer.File[] = body.files;
//       const fileUrls: string[] = [];

//       // Generate a unique filename using UUID
//       const uniqueFileName = uuidv4() + '-' + file.originalname;

//       // Construct the path to save the file locally
//       const filePath = join(__dirname, '../../uploads', uniqueFileName);

//       try {
//         // Use fs.promises to move the file
//         await fs.promises.rename(file.path, filePath);

//         // Generate the URL for the saved file and push it to fileUrls array
//         const fileUrl = `/uploads/${uniqueFileName}`;
//         fileUrls.push(fileUrl);
//         return fileUrl;
//       } catch (error) {
//         // Handle any error that might occur during file moving
//         console.error('Error moving file:', error);
//       }
//     }
//     @Post('uploads')
//     @UseInterceptors(FilesInterceptor('files', 1000, { dest: '/uploads' }))
//     async uploadFiles(
//       @UploadedFiles() files: Express.Multer.File[],
//     ): Promise<string[]> {
//       // console.log(files);

//       // const files: Express.Multer.File[] = body.files;
//       const fileUrls: string[] = [];

//       for (const file of files) {
//         // Generate a unique filename using UUID
//         const uniqueFileName = uuidv4() + '-' + file.originalname;

//         // Construct the path to save the file locally
//         const filePath = join(__dirname, '../../uploads', uniqueFileName);
//         console.log('File Path:', file);

//         try {
//           // Use fs.promises to move the file
//           await fs.promises.rename(file.path, filePath);

//           // Generate the URL for the saved file and push it to fileUrls array
//           const fileUrl = `/uploads/${uniqueFileName}`;
//           fileUrls.push(fileUrl);
//         } catch (error) {
//           // Handle any error that might occur during file moving
//           console.error('Error moving file:', error);
//         }
//       }

//       return fileUrls;
//     }
//   }
