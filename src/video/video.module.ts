import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from './entities/video.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
