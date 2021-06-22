import { HttpService, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
// repositories
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly postsRepository: PostsRepository,
  ) {}

  @Cron('0 * * * *')
  async pullPostsFromAlgolia(): Promise<void> {
    const posts = await this.postsRepository.findAll();
    const postsIds = posts.map((post) => post._id);

    const response = await this.httpService
      .get(process.env.ALGOLIA_API_URL)
      .toPromise();

    const newPosts = [];

    for (const post of response.data.hits) {
      if (postsIds.includes(post.objectID)) {
        continue;
      }

      let description: string;
      if (post.comment_text) {
        if (post.comment_text.value) {
          description = post.comment_text.value;
        } else {
          description = post.comment_text;
        }
      }

      newPosts.push(
        await this.postsRepository.create({
          description,
          _id: post.objectID,
          storyTitle: post.story_title,
          title: post.title,
          author: post.author,
        }),
      );
    }
  }
}
