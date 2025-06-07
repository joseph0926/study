import { useIntersection } from '@/shared/hooks/use-intersection';
import { getPostList } from '../post.service';
import { PostCard } from './post-card';
import { useInfiniteQuery } from '@tanstack/react-query';

export const PostList = () => {
  const {
    data,
    isLoading,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      getPostList({ limit: '10', nextCursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo.hasNext || lastPage.items.length === 0) {
        return undefined;
      }
      return lastPage.pageInfo.nextCursor;
    },
    staleTime: Infinity,
  });

  const sentinelRef = useIntersection(() => {
    if (hasNextPage && !isPending && !isFetchingNextPage) fetchNextPage();
  });

  return (
    <section className="space-y-4 p-4">
      {data?.pages.map(({ items }) =>
        items.map((p) => <PostCard key={p.id} post={p} />),
      )}

      {isFetchingNextPage && (
        <div className="animate-pulse p-4 text-center">Loading…</div>
      )}

      {isPending && (
        <div className="animate-pulse p-4 text-center">Loading…</div>
      )}

      <div ref={sentinelRef} />

      {!isLoading && !hasNextPage && (
        <p className="text-center text-sm text-gray-500">끝입니다 👋</p>
      )}
    </section>
  );
};
