// src/Pages/MasterPage.tsx
import React, { useEffect } from 'react';
import { useAdminService } from '../hooks/useAdminService';

// --- 스타일 정의 ---
const thStyle: React.CSSProperties = {
  borderBottom: '2px solid #333',
  padding: '10px 8px',
  textAlign: 'left',
  backgroundColor: '#f9f9f9',
};

const tdStyle: React.CSSProperties = {
  borderBottom: '1px solid #ccc',
  padding: '10px 8px',
  fontFamily: 'monospace',
  verticalAlign: 'top', // 긴 텍스트(메시지)의 경우 상단 정렬
};

const btnStyle: React.CSSProperties = {
  marginRight: '8px',
  padding: '8px 12px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f4f4f4',
};

const dangerBtnStyle: React.CSSProperties = {
  ...btnStyle,
  backgroundColor: '#d9534f',
  color: 'white',
  borderColor: '#d43f3a',
};
// --- 스타일 정의 끝 ---

const MasterPage: React.FC = () => {
  // Admin 훅에서 모든 상태와 함수를 가져옵니다.
  const {
    waitingListItems,
    guestbookItems,
    loading,
    error,
    fetchWaitingList,
    deleteWaitingItem,
    deleteAllWaitingItems,
    fetchGuestbook,
    deleteGuestbookItem,
    deleteAllGuestbookItems,
  } = useAdminService();

  // 페이지가 처음 로드될 때 두 데이터(번호표, 방명록)를 모두 가져옵니다.
  useEffect(() => {
    fetchWaitingList();
    fetchGuestbook();
  }, []); // 빈 배열: 마운트 시 1회만 실행

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: 'auto' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        마스터 페이지 (데이터 관리)
      </h1>

      {/* --- 글로벌 상태 표시 --- */}
      {error && (
        <p
          style={{
            color: 'red',
            fontWeight: 'bold',
            background: '#ffebeb',
            padding: '1rem',
          }}
        >
          <strong>에러:</strong> {error}
        </p>
      )}
      {loading && (
        <p
          style={{
            color: 'blue',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '1.2rem',
          }}
        >
          ... 🔄 API 요청 중 ...
        </p>
      )}

      {/* ======================================= */}
      {/* 1. 번호표 (waitingList) 섹션 */}
      {/* ======================================= */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>1. 번호표 (waitingList)</h2>
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={fetchWaitingList}
            disabled={loading}
            style={btnStyle}
          >
            번호표 새로고침
          </button>
          <button
            onClick={deleteAllWaitingItems}
            disabled={loading}
            style={dangerBtnStyle}
          >
            번호표 전체 삭제
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>번호표</th>
              <th style={thStyle}>전화번호</th>
              <th style={thStyle}>생성일 (Local)</th>
              <th style={thStyle}>UID (문서 ID)</th>
              <th style={thStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {waitingListItems.map((item) => (
              <tr key={item.uid}>
                <td style={tdStyle}>{item.ticketNumber}</td>
                <td style={tdStyle}>{item.phoneNumber}</td>
                <td style={tdStyle}>
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td style={tdStyle}>{item.uid}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => deleteWaitingItem(item.uid)}
                    disabled={loading}
                    style={{ ...btnStyle, fontSize: '0.8em' }}
                  >
                    개별 삭제
                  </button>
                </td>
              </tr>
            ))}
            {waitingListItems.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={5}
                  style={{ ...tdStyle, textAlign: 'center', color: '#888' }}
                >
                  번호표 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <hr style={{ margin: '2rem 0' }} />

      {/* ======================================= */}
      {/* 2. 방명록 (guestbook) 섹션 */}
      {/* ======================================= */}
      <section>
        <h2>2. 방명록 (guestbook)</h2>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={fetchGuestbook} disabled={loading} style={btnStyle}>
            방명록 새로고침
          </button>
          <button
            onClick={deleteAllGuestbookItems}
            disabled={loading}
            style={dangerBtnStyle}
          >
            방명록 전체 삭제
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>이름</th>
              <th style={{ ...thStyle, width: '40%' }}>메시지</th>
              <th style={thStyle}>생성일</th>
              <th style={thStyle}>ID (문서 ID)</th>
              <th style={thStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {guestbookItems.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.name}</td>
                <td style={{ ...tdStyle, whiteSpace: 'pre-wrap' }}>
                  {item.message}
                </td>
                <td style={tdStyle}>
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => deleteGuestbookItem(item.id)}
                    disabled={loading}
                    style={{ ...btnStyle, fontSize: '0.8em' }}
                  >
                    개별 삭제
                  </button>
                </td>
              </tr>
            ))}
            {guestbookItems.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={5}
                  style={{ ...tdStyle, textAlign: 'center', color: '#888' }}
                >
                  방명록 데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MasterPage;
