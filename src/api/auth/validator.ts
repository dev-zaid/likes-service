import { Request, Response, NextFunction } from 'express';
import { signUpSchema, loginSchema, getProfileSchema } from './model';
import LoggerInstance from '../../loaders/logger';

const signUpValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    req.body = await signUpSchema.parse(req.body);
    next();
  } catch (error) {
    LoggerInstance.error(error);
    res
      .status(422)
      .json({ success: false, message: 'SignUp Validation Failed', error: error.errors.map(error => error) });
  }
};

const loginValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    req.body = await loginSchema.parse(req.body);
    next();
  } catch (error) {
    LoggerInstance.error(error);
    res
      .status(422)
      .json({ success: false, message: 'Login Validation Failed', error: error.errors.map(error => error) });
  }
};

const getProfileValidator = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    req.body = await getProfileSchema.parse(req.headers);
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Token Required',
      error: e.errors.map(error => error),
    });
  }
};

export default signUpValidator;
export { loginValidator, getProfileValidator };
