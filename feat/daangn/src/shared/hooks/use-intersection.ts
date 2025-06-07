import { useEffect, useRef } from 'react';

export const useIntersection = (
  onIntersect: () => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onIntersect(),
      { threshold: 0.1, ...options },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [onIntersect, options]);

  return ref;
};
