import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TicketData } from '../types/ticket';

interface TicketState {
  ticket: TicketData | null;
  setTicket: (data: TicketData) => void;
  resetTicket: () => void;
}

export const useTicketStore = create<TicketState>()(
  //persist 미들웨어를 사용하여 로컬스토리지에 연동
  persist(
    (set) => ({
      // 초기 상태
      ticket: null,

      // 상태를 변경하는 액션(setTicket)
      setTicket: (data: TicketData) => {
        set({ ticket: data });
        // persist가 해당 변화 자동 감지 후 로컬스토리지에 자동 저장
      },
      // 상태 초기화 액션(resetTicket)
      resetTicket: () => {
        set({ ticket: null });
        // persist가 해당 변화 자동 감지 후 로컬스토리지 비움
      },
    }),
    {
      // persist 설정
      name: 'myTicket',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
