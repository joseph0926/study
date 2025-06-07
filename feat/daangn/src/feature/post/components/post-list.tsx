import { useInfiniteScroll } from '@/shared/hooks/use-infiniteScroll';
import { useIntersection } from '@/shared/hooks/use-intersection';
import type { PostResponseSchemaType } from '../schema/post-response.schema';
import { getPostList } from '../post.service';
import { useEffect } from 'react';

export const PostList = () => {
  const {
    items: posts,
    fetchPage,
    loading,
    hasNext,
  } = useInfiniteScroll<PostResponseSchemaType>(getPostList, '10');

  const sentinelRef = useIntersection(() => {
    if (hasNext && !loading) fetchPage();
  });

  useEffect(() => {
    getPostList({ nextCursor: null, limit: '10' });
  }, []);

  return (
    <section className="space-y-4 p-4">
      {posts.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}

      {loading && <div className="animate-pulse p-4 text-center">Loading…</div>}

      <div ref={sentinelRef} />

      {!hasNext && (
        <p className="text-center text-sm text-gray-500">끝입니다 👋</p>
      )}
    </section>
  );
};
