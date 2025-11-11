import React, { useState } from 'react';
import { useTicketStore } from '../store/ticketStore';
import { useTicketService } from '../hooks/useTicketService';
import { useGuestbookService } from '../hooks/useGuestbookService';

const guestbookItemStyle: React.CSSProperties = {
  border: '1px solid #eee',
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  backgroundColor: '#fafafa',
};

const TestPage: React.FC = () => {
  const currentTicket = useTicketStore((state) => state.ticket);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const {
    requestTicket,
    resetTicket,
    loading: ticketLoading,
    error: ticketError,
  } = useTicketService();

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketLoading) return;
    await requestTicket(phoneNumber);
  };

  const handleTicketReset = () => {
    if (ticketLoading) return;
    resetTicket();
  };
  const {
    entries,
    loading: guestbookLoading,
    submitLoading: guestbookSubmitLoading,
    error: guestbookError,
    fetchEntries,
    addEntry,
  } = useGuestbookService(); // 로드 시 자동으로 fetchEntries() 호출

  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');

  const handleGuestbookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guestbookSubmitLoading) return;
    await addEntry(guestMessage);
    setGuestName('');
    setGuestMessage('');
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: 'auto',
        backgroundColor: 'white',
      }}
    >
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        🎟️ 번호표 발급 테스트
      </h1>
      <section style={{ marginBottom: '2rem' }}>
        <h2>1. 현재 티켓 상태 (Zustand / LocalStorage)</h2>
        {currentTicket ? (
          <div
            style={{
              background: '#f0f0f0',
              padding: '1rem',
              borderRadius: '8px',
            }}
          >
            <p>
              <strong>전화번호:</strong> {currentTicket.phoneNumber}
            </p>
            <p>
              <strong>티켓 번호:</strong> {currentTicket.ticketNumber}
            </p>
            <p>
              <strong>UID:</strong> {currentTicket.uid}
            </p>
            <p>
              <strong>신규 발급 여부:</strong>{' '}
              {currentTicket.isNew ? 'Yes (방금 받음)' : 'No (기존 번호)'}
            </p>
          </div>
        ) : (
          <p style={{ color: '#888' }}>- 저장된 티켓 정보가 없습니다 -</p>
        )}
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>2. 기능 테스트</h2>
        <form onSubmit={handleTicketSubmit}>
          <label htmlFor='phone-input'>전화번호 입력:</label>
          <br />
          <input
            id='phone-input'
            type='tel'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='예: 010-1234-5678'
            disabled={ticketLoading}
            style={{
              minWidth: '250px',
              padding: '8px',
              marginRight: '8px',
              marginTop: '4px',
            }}
          />
          <button
            type='submit'
            disabled={ticketLoading}
            style={{ padding: '8px' }}
          >
            {ticketLoading ? '요청 중...' : '번호표 받기 / 확인'}
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={handleTicketReset}
            disabled={ticketLoading}
            style={{ background: '#ffcccc', padding: '8px' }}
          >
            LocalStorage 및 상태 초기화 (Reset)
          </button>
        </div>
      </section>
      <section style={{ marginBottom: '2rem' }}>
        <h2>3. 번호표 API 상태</h2>
        {ticketLoading && (
          <p style={{ color: 'blue' }}>
            <strong>... 번호표 API 요청 중 ...</strong>
          </p>
        )}
        {ticketError && (
          <p style={{ color: 'red' }}>
            <strong>번호표 에러:</strong> {ticketError}
          </p>
        )}
        {!ticketLoading && !ticketError && <p>- 대기 중 -</p>}
      </section>

      <hr style={{ margin: '3rem 0' }} />
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        ✍️ 방명록 (쓰기/읽기)
      </h1>
      <section style={{ marginBottom: '2rem' }}>
        <h2>1. 방명록 작성</h2>
        <form onSubmit={handleGuestbookSubmit}>
          <div style={{ marginBottom: '0.5rem' }}>
            <label
              htmlFor='guest-name'
              style={{ minWidth: '60px', display: 'inline-block' }}
            >
              이름:{' '}
            </label>
            <input
              id='guest-name'
              type='text'
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={guestbookSubmitLoading}
              style={{ padding: '8px' }}
            />
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <label
              htmlFor='guest-message'
              style={{
                minWidth: '60px',
                display: 'inline-block',
                verticalAlign: 'top',
              }}
            >
              메시지:{' '}
            </label>
            <textarea
              id='guest-message'
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              disabled={guestbookSubmitLoading}
              rows={3}
              style={{
                width: 'calc(100% - 70px)',
                minWidth: '250px',
                padding: '8px',
                boxSizing: 'border-box',
                verticalAlign: 'top',
              }}
              placeholder='방명록을 남겨주세요.'
            />
          </div>
          <button
            type='submit'
            disabled={guestbookSubmitLoading}
            style={{ padding: '8px', marginLeft: '64px', marginTop: '4px' }}
          >
            {guestbookSubmitLoading ? '업로드 중...' : '업로드'}
          </button>
        </form>
      </section>
      <section>
        <h2>2. 방명록 목록 (최신순)</h2>
        <button
          onClick={fetchEntries}
          disabled={guestbookLoading || guestbookSubmitLoading}
          style={{ padding: '8px' }}
        >
          {guestbookLoading ? '새로고침 중...' : '새로고침'}
        </button>
        {guestbookError && (
          <p style={{ color: 'red', marginTop: '1rem' }}>
            <strong>방명록 에러:</strong> {guestbookError}
          </p>
        )}
        <div style={{ marginTop: '1rem' }}>
          {guestbookLoading && <p>... 방명록 목록 로딩 중 ...</p>}
          {!guestbookLoading && entries.length === 0 && (
            <p style={{ color: '#888' }}>- 작성된 방명록이 없습니다 -</p>
          )}
          {entries.map((entry) => (
            <div key={entry.id} style={guestbookItemStyle}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>{entry.name}</strong>
                <span
                  style={{
                    fontSize: '0.8em',
                    color: '#888',
                    marginLeft: '1rem',
                  }}
                >
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </p>
              <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestPage;
