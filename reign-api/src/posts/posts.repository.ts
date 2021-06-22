import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// schemas
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel
      .find({ deleted: false })
      .sort({ created_at: 'desc' })
      .exec();
  }

  async findOne(postId: string): Promise<Post> {
    return this.postModel.findById({ _id: postId }).exec();
  }

  async create(createPostDto: any) {
    return this.postModel.create(createPostDto);
  }

  async update(postId: string, updatePostDto: any) {
    const existingPost = await this.postModel.findOneAndUpdate(
      { _id: postId },
      updatePostDto,
    );

    if (!existingPost) {
      throw new NotFoundException(`Post not found`);
    }

    return existingPost;
  }

  async remove(postId: string): Promise<any> {
    const existingPost = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { deleted: true },
    );

    return !!existingPost;
  }
}
