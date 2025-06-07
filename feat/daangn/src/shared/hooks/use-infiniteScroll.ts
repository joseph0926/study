import { useState, useCallback } from 'react';
import type { PaginationSchemaType } from '../schema/response.schema';

interface Fetcher<TItem> {
  (params: {
    nextCursor: string | null;
    limit: string;
  }): Promise<{ items: TItem[]; pageInfo: PaginationSchemaType }>;
}

export const useInfiniteScroll = <TItem>(
  fetcher: Fetcher<TItem>,
  limit = '10',
) => {
  const [items, setItems] = useState<TItem[]>([]);
  const [pageInfo, setPageInfo] = useState<PaginationSchemaType>({
    prevCursor: null,
    hasPrev: false,
    nextCursor: null,
    hasNext: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = useCallback(async () => {
    if (loading || !pageInfo?.hasNext) return;
    setLoading(true);
    const controller = new AbortController();

    try {
      const { items: newItems, pageInfo: next } = await fetcher({
        nextCursor: pageInfo.nextCursor,
        limit,
      });
      setItems((prev) => [...prev, ...newItems]);
      setPageInfo(next);
    } catch (err) {
      if (!(err as { name?: string }).name?.includes('Abort'))
        setError(err as Error);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [fetcher, limit, pageInfo, loading]);

  return { items, fetchPage, loading, error, hasNext: pageInfo?.hasNext };
};
