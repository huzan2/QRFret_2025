import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TicketData } from '../types/ticket';

interface TicketState {
  ticket: TicketData | null;
  setTicket: (data: TicketData) => void;
  resetTicket: () => void;
}

export const useTicketStore = create<TicketState>()(
  persist(
    (set) => ({
      ticket: null,
      setTicket: (data: TicketData) => {
        set({ ticket: data });
      },
      resetTicket: () => {
        set({ ticket: null });
      },
    }),
    {
      name: 'myTicket',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
