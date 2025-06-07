import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { PostResponseSchemaType } from '../schema/post-response.schema';
import { Link } from 'react-router';

type PostCardProps = {
  post: PostResponseSchemaType;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={`/post/${post.id}`} className="my-4 block">
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>
            {new Date(post.createdAt ?? '').toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{post.content}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
