import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  NotFoundException,
  Delete,
  Param,
  Patch,
  BadRequestException,
} from '@nestjs/common';
// repositories
import { PostsRepository } from './posts.repository';
// DTOs
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postRepository: PostsRepository) {}

  @Get()
  getAllPosts() {
    return this.postRepository.findAll();
  }

  @Get(':id')
  async getPost(@Res() res, @Param('id') postId: string) {
    const post = await this.postRepository.findOne(postId);
    if (!post) {
      throw new NotFoundException('The post could not be found');
    }
    return res.status(HttpStatus.OK).json(post);
  }

  @Post()
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    try {
      const post = await this.postRepository.create(createPostDTO);
      return res.status(HttpStatus.OK).json({
        message: 'A new post has been created successfully',
        post,
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async updatePost(
    @Res() res,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDTO,
  ) {
    const post = await this.postRepository.update(postId, updatePostDto);
    if (!post) {
      throw new NotFoundException('The post could not be found');
    }

    try {
      return res.status(HttpStatus.OK).json({
        message: 'The post has been updated successfully',
        post,
      });
    } catch (err) {
      throw new BadRequestException('The post could not be updated.');
    }
  }

  @Delete(':id')
  async deletePost(@Res() res, @Param('id') postId: string) {
    if (!postId) {
      throw new BadRequestException('Missing parameters');
    }

    const post = await this.postRepository.remove(postId);

    if (!post) {
      throw new NotFoundException('The post could not be found');
    }

    return res.status(HttpStatus.OK).json({
      message: 'The post has been deleted',
    });
  }
}
