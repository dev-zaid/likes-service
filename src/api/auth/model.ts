import { z } from 'zod';

export interface LoginResponse {
  message: string;
  status: number;
  token?: string;
}

const userSchema = z.object({
  name: z.string().nonempty('User ID is of the user is required'),
  email: z.string().nonempty('Post ID is of the post is required'),
  password: z.string().nonempty('User ID is of the user is required'),
  phone: z.number(),
});

const loginSchema = z.object({
  email: z.string().email('Enter a valid email').nonempty('Email is required'),
  password: z.string().min(6, 'Password should be greater than 6 characters').nonempty('Password is required'),
});

const signUpSchema = z.object({
  name: z.string().min(2).nonempty('Name is required'),
  email: z.string().email('Enter a valid email').nonempty('Email is required'),
  password: z.string().min(6, 'Password should be greater than 6 characters').nonempty('Password is required'),
  phone: z.number().min(10, 'Phone number should be 10 digits'),
});

const getProfileSchema = z.object({
  authorization: z.string().nonempty('Token is required'),
});

type User = z.infer<typeof userSchema>;

export default userSchema;
export { User, loginSchema, signUpSchema, getProfileSchema };
