import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
// repositories
import { PostsRepository } from './posts.repository';
import { Post } from './schemas/post.schema';

describe('PostsRepository', () => {
  let repository: PostsRepository;

  const MoskPost = {
    _id:'122131',
    title:"title 1",
    storyTitle:"story title 1",
    author:'author',
    description:'sadasd'
  }

beforeAll(async () => {
  const module:  TestingModule = await Test.createTestingModule({
    providers: [
      PostsRepository,
      {
        provide: getModelToken('Post'),
        useValue: {},
      }
    ]
  })
      .compile();

  repository = await module.get<PostsRepository>(PostsRepository)
});

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

    it("findPosts method", () => {
      expect( repository.findAll()).not.toEqual(null || [])
    }),
    it('findPost method', () => {
      expect( repository.findOne(MoskPost._id)).not.toEqual(null)
    }),
    it('updatePost method', () => {
      expect( repository.update(MoskPost._id, {
        title: 'title 2'
      })).not.toEqual( MoskPost)
    }),
    it('createPost method', ()=>{
      expect( repository.create(MoskPost)).not.toEqual(null)
    })
    it('deletePost method', ()=>{
      expect(repository.remove(MoskPost._id)).not.toEqual(null)
    })
})
