export interface TicketData {
  uid: string;
  phoneNumber: string;
  ticketNumber: number;
  isNew: boolean;
}

export interface WaitingItem {
  uid: string;
  phoneNumber: string;
  ticketNumber: number;
  createdAt: string;
}
