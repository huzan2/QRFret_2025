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
  const [loading, setLoading] = useState(false); // 목록 로딩
  const [submitLoading, setSubmitLoading] = useState(false); // 작성 로딩
  const [error, setError] = useState<string | null>(null);

  // 1. (읽기) 데이터 로드 함수
  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGuestbookEntriesFunction();
      setEntries(result.data); // 받아온 데이터로 상태 업데이트
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

  // 2. (쓰기) 새 항목 추가 함수
  const addEntry = async (name: string, message: string) => {
    if (!name || !message) {
      setError('이름과 메시지를 모두 입력하세요.');
      return;
    }
    setSubmitLoading(true);
    setError(null);
    try {
      // 서버에 생성 요청
      const result = await createGuestbookEntryFunction({ name, message });
      const newEntry = result.data; // 서버가 반환한 새 항목

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

  // 3. 페이지가 처음 로드될 때 1회만 데이터 가져오기
  useEffect(() => {
    fetchEntries();
  }, []); // 빈 의존성 배열

  return { entries, loading, submitLoading, error, fetchEntries, addEntry };
}
