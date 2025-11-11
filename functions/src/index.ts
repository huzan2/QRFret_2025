import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import {
  WaitingListData,
  CounterData,
  TicketResponse,
  WaitingItem,
  GuestbookData,
  GuestbookItem,
} from './types';

admin.initializeApp();
const db = admin.firestore();

export const issueTicket = functions
  .region('asia-northeast3')
  .https.onCall(
    async (data: { phoneNumber: string }): Promise<TicketResponse> => {
      const { phoneNumber } = data;

      if (!phoneNumber) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          '전화번호가 필요합니다.'
        );
      }
      const waitingListRef = db.collection(
        'waitingList'
      ) as admin.firestore.CollectionReference<WaitingListData>;
      const counterRef = db.doc(
        'counters/ticketCounter'
      ) as admin.firestore.DocumentReference<CounterData>;

      // 전화번호 중복 확인
      const snapshot = await waitingListRef
        .where('phoneNumber', '==', phoneNumber)
        .limit(1)
        .get();

      // 번호가 이미 존재(기존 티켓 번호 반환)
      if (!snapshot.empty) {
        const existingData = snapshot.docs[0].data();
        return {
          ...existingData,
          isNew: false,
        };
      }

      // 신규 번호 발급
      try {
        const ticketData = await db.runTransaction(
          async (transaction): Promise<TicketResponse> => {
            const counterDoc = await transaction.get(counterRef);

            let newTicketNumber = 1;
            if (counterDoc.exists) {
              newTicketNumber = (counterDoc.data()?.currentNumber ?? 0) + 1;
            }

            // 카운터 업데이트
            transaction.set(
              counterRef,
              { currentNumber: newTicketNumber },
              { merge: true }
            );

            // waitingList에 신규 문서 생성
            const uid = uuidv4();
            const newTicketRef = waitingListRef.doc(uid);
            const newTicketPayload: WaitingListData = {
              uid: uid,
              phoneNumber: phoneNumber,
              ticketNumber: newTicketNumber,
              createdAt:
                admin.firestore.FieldValue.serverTimestamp() as admin.firestore.Timestamp,
            };

            transaction.set(newTicketRef, newTicketPayload);

            return {
              uid: newTicketPayload.uid,
              phoneNumber: newTicketPayload.phoneNumber,
              ticketNumber: newTicketPayload.ticketNumber,
              isNew: true,
            };
          }
        );
        return ticketData;
      } catch (err) {
        console.error('번호 발급 트랜잭션 실패: ', err);
        throw new functions.https.HttpsError(
          'internal',
          '티켓 번호 발급에 실패했습니다. 다시 시도해주세요.'
        );
      }
    }
  );

export const getAllTickets = functions
  .region('asia-northeast3') // 👈 (2) 리전 설정
  .https.onCall(async (data, context): Promise<WaitingItem[]> => {
    const snapshot = await db
      .collection('waitingList')
      .orderBy('ticketNumber', 'asc')
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data() as WaitingListData;
      return {
        uid: data.uid,
        phoneNumber: data.phoneNumber,
        ticketNumber: data.ticketNumber,
        createdAt: data.createdAt.toDate().toISOString(), // Timestamp -> string
      };
    });
  });

export const deleteTicket = functions
  .region('asia-northeast3')
  .https.onCall(async (data: { uid: string }, context) => {
    if (!data.uid) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'UID가 필요합니다.'
      );
    }
    await db.collection('waitingList').doc(data.uid).delete();
    return { success: true, uid: data.uid };
  });

export const deleteAllTickets = functions
  .region('asia-northeast3')
  .https.onCall(async (data, context) => {
    const collectionRef = db.collection('waitingList');
    const snapshot = await collectionRef.limit(500).get(); // 500개씩 삭제
    if (snapshot.empty) return { success: true, deletedCount: 0 };

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return { success: true, deletedCount: snapshot.size };
  });

export const createGuestbookEntry = functions
  .region('asia-northeast3')
  .https.onCall(async (data: { message: string }): Promise<GuestbookItem> => {
    const guestbookCounterRef = db.doc(
      'counters/guestbookCounter'
    ) as admin.firestore.DocumentReference<CounterData>;

    const guestbookColRef = db.collection(
      'guestbook'
    ) as admin.firestore.CollectionReference<GuestbookData>;
    const { message } = data;

    if (!message) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '메시지 내용이 필요합니다.'
      );
    }
    try {
      const newEntryData = await db.runTransaction(
        async (transaction): Promise<GuestbookItem> => {
          const counterDoc = await transaction.get(guestbookCounterRef);
          let newNumber = 1;
          if (counterDoc.exists) {
            newNumber = (counterDoc.data()?.currentNumber ?? 0) + 1;
          }

          transaction.set(
            guestbookCounterRef,
            { currentNumber: newNumber },
            { merge: true }
          );

          const nickname = `익명 ${newNumber}`;
          const serverTimestamp = admin.firestore.Timestamp.now();

          const newPayload: GuestbookData = {
            name: nickname,
            message: message,
            createdAt: serverTimestamp,
          };

          const newDocRef = guestbookColRef.doc();
          transaction.set(newDocRef, newPayload);

          return {
            id: newDocRef.id,
            name: nickname,
            message: message,
            createdAt: serverTimestamp.toDate().toISOString(),
          };
        }
      );
      return newEntryData;
    } catch (err) {
      console.error('방명록 작성 트랜잭션 실패: ', err);
      throw new functions.https.HttpsError('internal', '방명록 작성 실패');
    }
  });

export const getGuestbookEntries = functions
  .region('asia-northeast3')
  .https.onCall(async () => {
    const snapshot = await db
      .collection('guestbook')
      .orderBy('createdAt', 'desc') // 최신순 정렬
      .limit(100) // 성능을 위해 최근 100개만
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as admin.firestore.Timestamp)
        .toDate()
        .toISOString(),
    }));
  });

export const deleteGuestbookEntry = functions
  .region('asia-northeast3')
  .https.onCall(async (data: { id: string }, context) => {
    if (!data.id) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '삭제할 문서의 ID가 필요합니다.'
      );
    }
    await db.collection('guestbook').doc(data.id).delete();
    return { success: true, id: data.id };
  });

export const deleteAllGuestbookEntries = functions
  .region('asia-northeast3')
  .https.onCall(async (data, context) => {
    const collectionRef = db.collection('guestbook');
    const snapshot = await collectionRef.limit(500).get(); // 한 번에 500개씩 삭제

    if (snapshot.empty) {
      return { success: true, deletedCount: 0 };
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    return { success: true, deletedCount: snapshot.size };
  });

export const getLikeCounts = functions
  .region('asia-northeast3')
  .https.onCall(async (): Promise<Record<string, number>> => {
    const snapshot = await db.collection('likeCounts').get();

    if (snapshot.empty) {
      return {};
    }

    const counts: Record<string, number> = {};
    snapshot.docs.forEach((doc) => {
      counts[doc.id] = doc.data().count;
    });

    return counts;
  });

export const toggleLike = functions
  .region('asia-northeast3')
  .https.onCall(
    async (data: {
      itemId: string;
      like: boolean;
    }): Promise<{ newCount: number }> => {
      const { itemId, like } = data; // like: true = 좋아요, false = 좋아요 취소

      if (!itemId) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          'itemId가 필요합니다.'
        );
      }

      const docRef = db.collection('likeCounts').doc(itemId);

      try {
        const newCount = await db.runTransaction(async (transaction) => {
          const doc = await transaction.get(docRef);

          let currentCount = 0;
          if (doc.exists) {
            currentCount = doc.data()?.count ?? 0;
          }
          const newCount = like
            ? currentCount + 1
            : Math.max(0, currentCount - 1);

          if (!doc.exists) {
            transaction.set(docRef, { count: newCount });
          } else {
            transaction.update(docRef, { count: newCount });
          }

          return newCount;
        });

        return { newCount: newCount };
      } catch (error) {
        console.error('좋아요 트랜잭션 실패:', error);
        throw new functions.https.HttpsError(
          'internal',
          '좋아요 처리에 실패했습니다.'
        );
      }
    }
  );
