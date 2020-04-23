import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.model';
import { UserService } from './user.service';
import { LoggingInterceptor } from './logging.interceptors';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    providers: [
        UserService,
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
        },
      ],
    exports: [UserService]
})
export class SharedModule {}