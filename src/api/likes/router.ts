import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
// import authenticate from '../../shared/middleware/authentication'; <--- AUTHENTICATION MIDDLEWARE
import { getLikes, likePost, unlikePost } from './controller';

const likeHandleRouter = Router();

async function handleLike(req: Request, res: Response) {
  try {
    const likeStatus = await likePost(req.params.id, res.locals.user.id);
    res.status(200).json({
      message: likeStatus.message,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Error liking the post',
    });
  }
}

async function handleUnlike(req: Request, res: Response) {
  try {
    const unlikeStatus = await unlikePost(req.params.id, res.locals.user.id);
    res.status(200).json({
      message: unlikeStatus.message,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Error unliking the post',
    });
  }
}

async function handleGetLikes(req: Request, res: Response) {
  try {
    const likes = await getLikes(req.params.id);
    res.status(200).json({
      message: likes.message,
      data: likes.data,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Error getting likes',
    });
  }
}

likeHandleRouter.put('/like/:id', handleLike); //Like a post
likeHandleRouter.patch('/unlike/:id', handleUnlike); //Unlike a post
likeHandleRouter.get('/getLikes/:id', handleGetLikes); //Get number of Likes

export default likeHandleRouter;
