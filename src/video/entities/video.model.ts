import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop()
  originalname: string;

  @Prop()
  mimetype: string;

  @Prop()
  filename: string;

  @Prop()
  size: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
