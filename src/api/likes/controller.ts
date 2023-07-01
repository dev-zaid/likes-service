import { ObjectID } from 'mongodb';
import database from '../../loaders/database';
import ErrorClass from '../../shared/types/error';

export async function likePost(postID: string, userID: string) {
  const post = await (await database())
    .collection('posts')
    .findOne({ _id: new ObjectID(postID), likes: { $nin: [new ObjectID(userID)] } });
  if (!post) {
    throw new ErrorClass('Post does not exist or is already liked!', 404);
  }
  await (await database())
    .collection('posts')
    .updateOne({ _id: new ObjectID(postID) }, { $push: { likes: new ObjectID(userID) } });
  return {
    bool: true,
    message: 'Blog liked successfully.',
    status: 200,
  };
}

export async function unlikePost(postID: string, userID: string) {
  const post = await (await database())
    .collection('posts')
    .findOne({ _id: new ObjectID(postID), likes: { $in: [new ObjectID(userID)] } });
  if (!post) {
    throw new ErrorClass('Post does not exist or is not liked!', 404);
  }
  await (await database())
    .collection('posts')
    .updateOne({ _id: new ObjectID(postID) }, { $pullAll: { likes: [new ObjectID(userID)] } });
  return {
    bool: true,
    message: 'Blog unliked successfully.',
    status: 200,
  };
}

export async function getLikes(postID: string) {
  const post = await (await database()).collection('posts').findOne({ _id: new ObjectID(postID) });
  if (!post) {
    throw new ErrorClass('Post does not exist or is not liked!', 404);
  }
  return {
    message: 'Likes retrieved successfully',
    status: 200,
    data: post.likes.length,
  };
}
