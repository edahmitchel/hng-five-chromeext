import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure Multer storage for local disk
  const storage = multer.diskStorage({
    destination: './uploads', // Directory to store files locally
    filename: (req, file, callback) => {
      callback(null, Date.now() + '-' + file.originalname);
    },
  });

  // const upload = multer({ storage });
  app.use('/static', express.static(join(__dirname, '..', 'uploads')));
  // app.useGlobalInterceptors(FileInterceptor('files', { storage }));

  await app.listen(3000);
}
bootstrap();
