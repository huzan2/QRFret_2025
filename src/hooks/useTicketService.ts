import { useState } from 'react';
import { issueTicketFunction } from '../firebase';
import type { TicketData } from '../types/ticket';
import { useTicketStore } from '../store/ticketStore';

interface UseTicketServiceReturn {
  requestTicket: (phoneNumber: string) => Promise<void>;
  resetTicket: () => void;
  loading: boolean;
  error: string | null;
}

export function useTicketService(): UseTicketServiceReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 스토어에서 액션 가져옴
  const setTicket = useTicketStore((state) => state.setTicket);
  const resetTicket = useTicketStore((state) => state.resetTicket);

  // 전화번호를 받아 Cloud Function 호출
  const requestTicket = async (phoneNumber: string): Promise<void> => {
    if (!phoneNumber) {
      setError('전화번호를 입력하세요');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Cloud Function 호출
      const res = await issueTicketFunction({ phoneNumber });
      // 응답에서 data 추출
      const ticketData: TicketData = res.data;
      // persist 미들웨어가 자동으로 로컬스토리지에 저장
      setTicket(ticketData);
    } catch (err: unknown) {
      console.error('Cloud Function 호출 오류', err);
      setError('번호표 발급 중 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return { requestTicket, resetTicket, loading, error };
}
