import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
// services
import { PostsService } from './posts.service';
// repositories
import { PostsRepository } from './posts.repository';

describe('PostsService', () => {
  let service: PostsService;

  const algoliaPosts = [
    {
      objectID: '5d812aae87985df8c23c1f68',
      story_title: 'Test Post 1',
      title: 'Test Post 1',
      author: 'Special Author',
      comment_text: 'Post content would be here',
      deleted: false,
    },
    {
      objectID: '5d812aae87985df8c23c1f5f',
      story_title: 'Test Post 2',
      title: 'Test Post 2',
      author: 'Special Author 2',
      comment_text: 'Post content would be here',
      deleted: false,
    },
    {
      objectID: '5d812aae87985df8c23c1f56',
      story_title: 'Test Post 3',
      title: 'Test Post 3',
      author: 'Special Author 3',
      comment_text: 'Post content would be here',
      deleted: false,
    },
    {
      objectID: '5d812aae87985df8c23c1f78',
      story_title: 'Test Post 4',
      title: 'Test Post 4',
      author: 'Special Author 4',
      comment_text: 'Post content would be here',
      deleted: false,
    },
  ];

  const mockPosts = [
    {
      _id: '5d812aae87985df8c23c1f68',
      storyTitle: 'Test Post 1',
      title: 'Test Post 1',
      author: 'Special Author',
      description: 'Post content would be here',
      deleted: false,
    },
    {
      _id: '5d812aae87985df8c23c1f5f',
      storyTitle: 'Test Post 2',
      title: 'Test Post 2',
      author: 'Special Author 2',
      description: 'Post content would be here',
      deleted: false,
    },
  ];

  const createMethod = jest.fn((values) => values);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [
        PostsService,
        {
          provide: getModelToken('Post'),
          useValue: {
            create: createMethod,
            find: jest.fn(() => ({
              sort: jest.fn(() => ({ exec: jest.fn(() => mockPosts) })),
            })),
          },
        },
        PostsRepository,
      ],
    })
      .overrideProvider(HttpService)
      .useValue({
        get: () => ({
          toPromise: async () => {
            return { data: { hits: algoliaPosts } };
          },
        }),
      })
      .compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should pull posts from algolia and store the new ones', async () => {
    await service.pullPostsFromAlgolia();
    expect(createMethod).toHaveBeenCalledTimes(2);
  });
});
