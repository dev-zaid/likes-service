import { z } from 'zod';

const LikeEvent = z.object({
  user_id: z.string().nonempty('User ID is of the user is required'),
  content_id: z.string().nonempty('Post ID is of the post is required'),
});

type Like = z.infer<typeof LikeEvent>;

export default LikeEvent;
export { Like };
