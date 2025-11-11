import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import type { WaitingItem } from '../types/ticket';
import type { GuestbookItem } from '../types/guestbook';
import {
  getAllTicketsFunction,
  deleteTicketFunction,
  deleteAllTicketsFunction,
  getGuestbookEntriesFunction,
  deleteGuestbookEntryFunction,
  deleteAllGuestbookEntriesFunction,
} from '../firebase';

export function useAdminService() {
  const [waitingListItems, setWaitingListItems] = useState<WaitingItem[]>([]);
  const [guestbookItems, setGuestbookItems] = useState<GuestbookItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMsg = (err: unknown): string => {
    return err instanceof FirebaseError || err instanceof Error
      ? err.message
      : '알 수 없는 오류가 발생했습니다.';
  };

  const fetchWaitingList = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllTicketsFunction();
      setWaitingListItems(result.data);
    } catch (err: unknown) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const deleteWaitingItem = async (uid: string) => {
    if (!window.confirm(`[${uid}] 번호표를 정말 삭제하시겠습니까?`)) return;
    setLoading(true);
    setError(null);
    try {
      await deleteTicketFunction({ uid });
      setWaitingListItems((prev) => prev.filter((item) => item.uid !== uid));
    } catch (err: unknown) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const deleteAllWaitingItems = async () => {
    const confirmText = '전체삭제';
    if (
      window.prompt(
        `!!경고!! 모든 '번호표' 데이터를 삭제합니다.\n동의하시면 '${confirmText}'를 입력하세요.`
      ) !== confirmText
    ) {
      alert('취소되었습니다.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await deleteAllTicketsFunction();
      alert(`번호표 ${result.data.deletedCount}개 항목이 삭제되었습니다.`);
      setWaitingListItems([]);
    } catch (err: unknown) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestbook = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGuestbookEntriesFunction();
      setGuestbookItems(result.data);
    } catch (err: unknown) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const deleteGuestbookItem = async (id: string) => {
    if (!window.confirm(`[${id}] 방명록을 정말 삭제하시겠습니까?`)) return;
    setLoading(true);
    setError(null);
    try {
      await deleteGuestbookEntryFunction({ id });
      setGuestbookItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: unknown) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const deleteAllGuestbookItems = async () => {
    const confirmText = '전체삭제';
    if (
      window.prompt(
        `!!경고!! 모든 '방명록' 데이터를 삭제합니다.\n동의하시면 '${confirmText}'를 입력하세요.`
      ) !== confirmText
    ) {
      alert('취소되었습니다.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await deleteAllGuestbookEntriesFunction();
      alert(`방명록 ${result.data.deletedCount}개 항목이 삭제되었습니다.`);
      setGuestbookItems([]);
    } catch (err: unknown) {
      setError(getErrorMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    waitingListItems,
    guestbookItems,
    loading,
    error,
    fetchWaitingList,
    deleteWaitingItem,
    deleteAllWaitingItems,
    fetchGuestbook,
    deleteGuestbookItem,
    deleteAllGuestbookItems,
  };
}
