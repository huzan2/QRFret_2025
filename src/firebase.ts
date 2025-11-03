import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
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
// const analytics = getAnalytics(app);
export const functions = getFunctions(app, 'asia-northeast3');

export const issueTicketFunction: HttpsCallable<
  { phoneNumber: string },
  TicketData
> = httpsCallable(functions, 'issueTicket');

/////////////// gemini code //////////////

/** 1. 모든 티켓 가져오기 */
export const getAllTicketsFunction: HttpsCallable<
  undefined, // 입력 없음
  WaitingItem[] // 출력: WaitingItem 배열
> = httpsCallable(functions, 'getAllTickets');

/** 2. 특정 티켓 삭제 */
export const deleteTicketFunction: HttpsCallable<
  { uid: string }, // 입력: { uid }
  { success: boolean; uid: string } // 출력
> = httpsCallable(functions, 'deleteTicket');

/** 3. 모든 티켓 삭제 (일부) */
export const deleteAllTicketsFunction: HttpsCallable<
  undefined, // 입력 없음
  { success: boolean; deletedCount: number } // 출력
> = httpsCallable(functions, 'deleteAllTickets');
/** 1. 방명록 생성 (TestPage용) */
export const createGuestbookEntryFunction: HttpsCallable<
  { name: string; message: string }, // 입력
  GuestbookItem // 출력 (방금 생성된 항목)
> = httpsCallable(functions, 'createGuestbookEntry');

/** 2. 방명록 읽기 (TestPage용) */
export const getGuestbookEntriesFunction: HttpsCallable<
  undefined, // 입력 없음
  GuestbookItem[] // 출력 (항목 배열)
> = httpsCallable(functions, 'getGuestbookEntries');

/** 3. 방명록 개별 삭제 (MasterPage용) */
export const deleteGuestbookEntryFunction: HttpsCallable<
  { id: string }, // 입력
  { success: boolean; id: string } // 출력
> = httpsCallable(functions, 'deleteGuestbookEntry');

/** 4. 방명록 전체 삭제 (MasterPage용) */
export const deleteAllGuestbookEntriesFunction: HttpsCallable<
  undefined,
  { success: boolean; deletedCount: number }
> = httpsCallable(functions, 'deleteAllGuestbookEntries');
