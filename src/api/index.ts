import { Router } from 'express';
import likeHandleRouter from './likes/router';
import authRouter from './auth/router';
import authenticate from '../shared/middleware/authentication';

export default (): Router => {
  const app = Router();

  //TODO: add routes here...
  app.use('/like-service', authenticate, likeHandleRouter);
  app.use('/auth', authRouter);
  return app;
};
