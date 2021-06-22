import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// schemas
import { PostSchema } from './schemas/post.schema';
// controllers
import { PostsController } from './posts.controller';
// repositories
import { PostsRepository } from './posts.repository';
// services
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    HttpModule,
  ],
  controllers: [PostsController],
  providers: [PostsRepository, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
