import { Router, Request, Response } from 'express';
import { createUser, getProfile, loginUserByEmail } from './controller';
import LoggerInstance from '../../loaders/logger';
import signUpValidator, { loginValidator, getProfileValidator } from './validator';
import authenticate from '../../shared/middleware/authentication';

const authRouter = Router();

const handleSignUp = async (req: Request, res: Response) => {
  try {
    const signup = await createUser(req.body);
    /* body : name, email, phone, password(unhashed) */
    if (signup.success) {
      res.status(201).json({ message: 'User created successfully', success: true });
    }
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Signup Failed' });
  }
};

const handleLogin = async (req: Request, res: Response) => {
  try {
    const login = await loginUserByEmail(req.body.email, req.body.password);
    res.status(login.status).json({ message: 'Login successful', success: true, token: login.token ?? '' });
  } catch (error) {
    LoggerInstance.error(error);
    res.status(error.status || 500).json({ success: false, message: error.message || 'Login Failed' });
  }
};

async function handleGetProfile(req: Request, res: Response) {
  try {
    const user = await getProfile(res.locals.user.id);
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

authRouter.post('/signup', signUpValidator, handleSignUp);
authRouter.post('/login', loginValidator, handleLogin);
authRouter.get('/', authenticate, handleGetProfile);

export default authRouter;
