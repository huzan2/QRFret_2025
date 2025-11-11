import { initializeApp } from 'firebase/app';
import {
  getFunctions,
  httpsCallable,
  type HttpsCallable,
} from 'firebase/functions';
import type { TicketData, WaitingItem } from './types/ticket';
import type { GuestbookItem } from './types/guestbook';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MS_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app, 'asia-northeast3');

export const issueTicketFunction: HttpsCallable<
  { phoneNumber: string },
  TicketData
> = httpsCallable(functions, 'issueTicket');

export const getAllTicketsFunction: HttpsCallable<undefined, WaitingItem[]> =
  httpsCallable(functions, 'getAllTickets');

export const deleteTicketFunction: HttpsCallable<
  { uid: string },
  { success: boolean; uid: string }
> = httpsCallable(functions, 'deleteTicket');

export const deleteAllTicketsFunction: HttpsCallable<
  undefined,
  { success: boolean; deletedCount: number }
> = httpsCallable(functions, 'deleteAllTickets');

export const createGuestbookEntryFunction: HttpsCallable<
  { message: string },
  GuestbookItem
> = httpsCallable(functions, 'createGuestbookEntry');

export const getGuestbookEntriesFunction: HttpsCallable<
  undefined,
  GuestbookItem[]
> = httpsCallable(functions, 'getGuestbookEntries');

export const deleteGuestbookEntryFunction: HttpsCallable<
  { id: string },
  { success: boolean; id: string }
> = httpsCallable(functions, 'deleteGuestbookEntry');

export const deleteAllGuestbookEntriesFunction: HttpsCallable<
  undefined,
  { success: boolean; deletedCount: number }
> = httpsCallable(functions, 'deleteAllGuestbookEntries');

export const getLikeCountsFunction: HttpsCallable<
  undefined,
  Record<string, number>
> = httpsCallable(functions, 'getLikeCounts');

export const toggleLikeFunction: HttpsCallable<
  { itemId: string; like: boolean },
  { newCount: number }
> = httpsCallable(functions, 'toggleLike');
