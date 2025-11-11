// src/hooks/useGuestbookService.ts
import { useState, useEffect } from 'react';
import { FirebaseError } from 'firebase/app';
import type { GuestbookItem } from '../types/guestbook';
import {
  getGuestbookEntriesFunction,
  createGuestbookEntryFunction,
} from '../firebase';

export function useGuestbookService() {
  const [entries, setEntries] = useState<GuestbookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGuestbookEntriesFunction();
      setEntries(result.data);
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof FirebaseError || err instanceof Error
          ? 'Error message: ' + err.message
          : '방명록 로딩 실패';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (message: string) => {
    if (!message) {
      setError('메시지를 입력하세요.');
      return;
    }
    setSubmitLoading(true);
    setError(null);
    try {
      const result = await createGuestbookEntryFunction({ message });
      const newEntry = result.data;

      // 성공 시, 로컬 상태에 즉시 반영 (최신순이므로 맨 앞에 추가)
      setEntries((prevEntries) => [newEntry, ...prevEntries]);
    } catch (err: unknown) {
      console.error(err);
      const msg =
        err instanceof FirebaseError || err instanceof Error
          ? err.message
          : '항목 추가 실패';
      setError(msg);
    } finally {
      setSubmitLoading(false);
    }
  };
  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, loading, submitLoading, error, fetchEntries, addEntry };
}
