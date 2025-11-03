import * as admin from 'firebase-admin';

export interface WaitingListData {
  uid: string;
  phoneNumber: string;
  ticketNumber: number;
  createdAt: admin.firestore.Timestamp;
}

export interface CounterData {
  currentNumber: number;
}

export interface TicketResponse {
  uid: string;
  phoneNumber: string;
  ticketNumber: number;
  isNew: boolean;
}

export interface WaitingItem {
  uid: string;
  phoneNumber: string;
  ticketNumber: number;
  createdAt: string; // ISO 8601 날짜 문자열
}
export interface GuestbookItem {
  id: string; // Firestore 문서 ID
  name: string;
  message: string;
  createdAt: string; // ISO 8601 날짜 문자열
}
export interface GuestbookData {
  name: string;
  message: string;
  createdAt: admin.firestore.Timestamp | admin.firestore.FieldValue;
}
