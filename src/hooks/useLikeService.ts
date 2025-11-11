// src/hooks/useLikeService.ts
import { useState, useCallback } from 'react';
import { getLikeCountsFunction, toggleLikeFunction } from '../firebase';
import {
  useLikeStore,
  useLikeCountStore,
  useLikePendingStore,
} from '../store/likeStore';

export function useLikeService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleUserLike = useLikeStore((state) => state.toggleLike);
  const { setCounts, updateCount } = useLikeCountStore();
  const setPending = useLikePendingStore((state) => state.setPending);

  const fetchAllCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getLikeCountsFunction();
      setCounts(result.data);
    } catch (err: unknown) {
      console.error(err);
      setError('좋아요 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [setCounts]);

  const handleToggleLike = async (
    itemId: string,
    isCurrentlyLiked: boolean
  ) => {
    const newLikeState = !isCurrentlyLiked;
    setError(null);
    setPending(itemId);
    toggleUserLike(itemId);
    try {
      const result = await toggleLikeFunction({
        itemId: itemId,
        like: newLikeState,
      });
      updateCount(itemId, result.data.newCount);
    } catch (err: unknown) {
      console.error(err);
      setError('좋아요 처리에 실패했습니다.');
      // 실패 시 ui 변경사항 롤백
      toggleUserLike(itemId);
    } finally {
      setPending(null);
    }
  };

  return { loading, error, fetchAllCounts, handleToggleLike };
}
