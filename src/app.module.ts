import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileManagerModule } from './filemanager/filemanager.module';
import { ProductModule } from './products/product.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(
      'mongodb+srv://test:1029384756@cluster0-bafdm.mongodb.net/test-ecommerce?retryWrites=true&w=majority'
    ),
    MulterModule.register({dest: './files'}),
    FileManagerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
