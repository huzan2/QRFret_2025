export interface GuestbookItem {
  id: string; // Firestore 문서 ID
  name: string;
  message: string;
  createdAt: string; // ISO 8601 날짜 문자열
}
