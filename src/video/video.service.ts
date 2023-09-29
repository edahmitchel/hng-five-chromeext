import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './entities/video.model';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import path, { join } from 'path';
import * as fs from 'fs';
@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}
  async uploadFile(file: Express.Multer.File): Promise<string> {
    console.log(file);
    // Generate a shorter unique identifier (timestamp + random string)
    const shortUniqueId =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    // Create the unique file name by combining the short unique ID and the original file extension
    const fileExtension = join('.', file.originalname.split('.').pop()!);
    const uniqueFileName = `${shortUniqueId}.${fileExtension}`;

    const filePath = join(__dirname, '../../uploads', uniqueFileName);

    try {
      await fs.promises.rename(file.path, filePath);

      const createdFile = new this.videoModel({
        originalname: file.originalname,
        mimetype: file.mimetype,
        filename: uniqueFileName,
        size: file.size,
      });

      createdFile.save();
      const appUrl = process.env.APP_URL as string;
      return appUrl + '/' + uniqueFileName;
    } catch (error) {
      console.error('Error moving file:', error);
      throw new Error('File upload failed');
    }
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const uploadedVideos: string[] = [];
    console.log('FILES', files[0]);

    for (const file of files) {
      const shortUniqueId =
        Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

      const fileExtension = join('.', file.originalname.split('.').pop()!);
      const uniqueFileName = `${shortUniqueId}.${fileExtension}`;

      const filePath = join(__dirname, '../../uploads', uniqueFileName);

      try {
        await fs.promises.rename(file.path, filePath);

        const createdFile = new this.videoModel({
          originalname: file.originalname,
          mimetype: file.mimetype,
          filename: uniqueFileName,
          size: file.size,
        });

        const savedVideo = await createdFile.save();
        const appUrl = process.env.APP_URL as string;
        const link = appUrl + '/' + uniqueFileName;
        uploadedVideos.push(link);
      } catch (error) {
        console.error('Error moving file:', error);
        throw new Error('File upload failed');
      }
    }

    return uploadedVideos;
  }

  async serveFile(id: string): Promise<any> {
    const file = await this.videoModel.findById(id);
    const appUrl = process.env.APP_URL as string;
    return appUrl + '/' + file.filename;
  }

  async serveAllFiles(): Promise<string[]> {
    const uploadedVideos: string[] = [];
    const files = await this.videoModel.find().exec();
    for (const file of files) {
      const appUrl = process.env.APP_URL as string;
      const link = appUrl + '/' + file.filename;
      uploadedVideos.push(link);
    }
    return uploadedVideos;
  }
}
