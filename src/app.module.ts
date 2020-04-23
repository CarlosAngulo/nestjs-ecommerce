import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileManagerModule } from './filemanager/filemanager.module';
import { ProductModule } from './products/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forRoot(
      process.env.MONGO_URI, 
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      }
    ),
    MulterModule.register({dest: process.env.FILES}),
    FileManagerModule,
    AuthModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
