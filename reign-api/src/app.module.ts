import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
// modules
import { PostsModule } from './posts/posts.module';
// controllers
import { AppController } from './app.controller';
// services
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostsModule,
    MongooseModule.forRoot(
      `${process.env.MONGO_CONNECTION_STRING}/${process.env.MONGO_DB}`,
    ),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
