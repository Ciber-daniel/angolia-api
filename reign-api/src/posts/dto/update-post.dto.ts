import { PartialType } from '@nestjs/mapped-types';
// DTOs
import { CreatePostDTO } from './create-post.dto';

export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
