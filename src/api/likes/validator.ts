import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import LikeEvent from './model';

export async function likeEventValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await LikeEvent.parseAsync(req.body);
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation field',
      error: e.errors.map(error => error),
    });
  }
}
