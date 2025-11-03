import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import {
  WaitingListData,
  CounterData,
  TicketResponse,
  WaitingItem,
  // GuestbookData,
  // GuestbookItem,
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

///////////////// Gemini Code /////////////////
export const getAllTickets = functions
  .region('asia-northeast3') // 👈 (2) 리전 설정
  .https.onCall(async (data, context): Promise<WaitingItem[]> => {
    // 🚨 보안 체크
    // if (!context.auth || context.auth.uid !== ADMIN_UID) {
    //   throw new functions.https.HttpsError(
    //     'permission-denied',
    //     '관리자만 이 기능을 사용할 수 있습니다.'
    //   );
    // }

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

/**
 * [함수 3: 관리자] 번호표 개별 삭제
 */
export const deleteTicket = functions
  .region('asia-northeast3') // 👈 (3) 리전 설정
  .https.onCall(async (data: { uid: string }, context) => {
    // 🚨 보안 체크
    // if (!context.auth || context.auth.uid !== ADMIN_UID) {
    //   throw new functions.https.HttpsError(
    //     'permission-denied',
    //     '관리자만 이 기능을 사용할 수 있습니다.'
    //   );
    // }
    if (!data.uid) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'UID가 필요합니다.'
      );
    }
    await db.collection('waitingList').doc(data.uid).delete();
    return { success: true, uid: data.uid };
  });

/**
 * [함수 4: 관리자] 번호표 전체 삭제
 */
export const deleteAllTickets = functions
  .region('asia-northeast3') // 👈 (4) 리전 설정
  .https.onCall(async (data, context) => {
    // 🚨 보안 체크
    // if (!context.auth || context.auth.uid !== ADMIN_UID) {
    //   throw new functions.https.HttpsError(
    //     'permission-denied',
    //     '관리자만 이 기능을 사용할 수 있습니다.'
    //   );
    // }

    const collectionRef = db.collection('waitingList');
    const snapshot = await collectionRef.limit(500).get(); // 500개씩 삭제
    if (snapshot.empty) return { success: true, deletedCount: 0 };

    const batch = db.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    return { success: true, deletedCount: snapshot.size };
  });
/** 1. (생성) 방명록 항목 생성 (TestPage용) */
export const createGuestbookEntry = functions
  .region('asia-northeast3')
  .https.onCall(async (data: { name: string; message: string }) => {
    const { name, message } = data;

    if (!name || !message) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '이름과 메시지가 필요합니다.'
      );
    }

    const newEntry = {
      name: name,
      message: message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // 'guestbook' 컬렉션에 새 문서 추가
    const writeResult = await db.collection('guestbook').add(newEntry);

    // 생성된 문서를 바로 클라이언트에 반환 (ID 포함)
    const newDoc = await writeResult.get();
    return {
      id: newDoc.id,
      ...newDoc.data(),
      // Timestamp는 클라이언트 전송을 위해 ISO 문자열로 변환
      createdAt: newDoc.createTime?.toDate().toISOString(),
    };
  });

/** 2. (읽기) 방명록 모든 항목 가져오기 (TestPage용) */
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

/** 3. (개별 삭제) 방명록 항목 삭제 (MasterPage용) */
export const deleteGuestbookEntry = functions
  .region('asia-northeast3')
  .https.onCall(async (data: { id: string }, context) => {
    // [보안 권장] 여기에 관리자인지 확인하는 로직을 추가해야 합니다.
    // if (!context.auth || context.auth.uid !== "ADMIN_UID") {
    //   throw new functions.https.HttpsError("permission-denied", "권한 없음");
    // }

    if (!data.id) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '삭제할 문서의 ID가 필요합니다.'
      );
    }
    await db.collection('guestbook').doc(data.id).delete();
    return { success: true, id: data.id };
  });

/** 4. (전체 삭제) 방명록 전체 삭제 (MasterPage용) */
export const deleteAllGuestbookEntries = functions
  .region('asia-northeast3')
  .https.onCall(async (data, context) => {
    // [보안 권장] 관리자 확인 로직...

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
    // (참고: 500개 이상일 경우, 삭제될 때까지 이 함수를 반복 호출해야 함)
  });
