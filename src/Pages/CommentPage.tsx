import styled from 'styled-components';
import { useGuestbookService } from '../hooks/useGuestbookService';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  profile1,
  profile2,
  profile3,
  chatBubble_dark,
  background_image,
} from '../styles/images';
import { BackgroundImage, ChatImageLight } from './MainPage';

const profileArr = [profile1, profile2, profile3];

const CommentPage: React.FC = () => {
  const { entries, loading, error, submitLoading, addEntry } =
    useGuestbookService();

  const navigate = useNavigate();
  const [guestMessage, setGuestMessage] = useState('');

  const handleGuestbookSubmit = async () => {
    if (guestMessage.length === 0) {
      alert('메시지를 입력해주세요!');
      return;
    }
    if (submitLoading) {
      return;
    }
    await addEntry(guestMessage);
    setGuestMessage('');
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <CommentMainWrapper>
        <BlackLayer>
          <BackgroundImage src={background_image} />
        </BlackLayer>
        <TextareaWrapper>
          <CommentInputArea
            id='comment'
            placeholder='남기실 말씀을 입력해주세요'
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              if (e.target.scrollHeight === e.target.clientHeight) {
                setGuestMessage(e.target.value);
              }
            }}
            disabled={submitLoading}
            value={guestMessage}
            rows={5}
          />
          <SubmitButton
            disabled={submitLoading}
            onClick={handleGuestbookSubmit}
          >
            Submit
          </SubmitButton>
        </TextareaWrapper>
        <CommentAreaWrapper>
          {error && (
            <p style={{ color: 'white' }}>
              에러가 발생했습니다. 새로고침해주세요!
            </p>
          )}
          {loading && <p style={{ color: 'white' }}>방명록 목록 로딩 중 ...</p>}
          {!loading && entries.length === 0 && <p>작성된 방명록이 없습니다</p>}
          {entries.map((entry, idx) => {
            const picIdx = idx % 3;
            const selectedProfile = profileArr[picIdx];
            return (
              <CommentWrapper key={idx}>
                <Line1Wrapper>
                  <ProfileImg src={selectedProfile} />
                  <NameAndDate>
                    <NicknameText>{entry.name}</NicknameText>
                    <DateText>
                      {new Date(entry.createdAt).toLocaleString().split('.')[3]}
                    </DateText>
                  </NameAndDate>
                </Line1Wrapper>
                <CommentText>{entry.message}</CommentText>
              </CommentWrapper>
            );
          })}
        </CommentAreaWrapper>
        <ChatImageLight
          src={chatBubble_dark}
          onClick={() => {
            navigate('/');
          }}
        />
      </CommentMainWrapper>
    </>
  );
};

export default CommentPage;

const CommentMainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 92dvh; // 모바일 브라우저 상/하단바 고려해 dynamic viewport height 적용
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding-top: 60px;
  padding-bottom: 20px;
  overflow: hidden;
`;

const CommentText = styled.p`
  color: white;
  padding-top: 10px;
  white-space: pre-wrap;
`;

const NameAndDate = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const DateText = styled.p`
  font-size: 12px;
  color: #bdc1caff;
  padding-left: 8px;
`;

const NicknameText = styled.p`
  font-size: 15px;
  color: #f3f4f6ff;
  padding-top: 7px;
  padding-left: 10px;
`;

const Line1Wrapper = styled.div`
  height: 40px;
  display: flex;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
`;

const CommentWrapper = styled.div`
  width: 90%;
  background-color: #1e2128ff;
  border-radius: 10px;
  border: 1px solid #323743ff;
  padding: 15px 15px 20px 15px;
  margin-bottom: 10px;
`;

const CommentAreaWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 5px -30px 5px;
  z-index: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentInputArea = styled.textarea`
  width: 100%;
  height: 70%;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  background-color: black;
  color: white;
  border-radius: 6px;
  border: 0;
  resize: none;
  &:focus {
    outline: none;
    border: 1px solid;
    border-color: #8a9cae;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 25%;
  background-color: #171a1fff;
  font-size: 15px;
  border-radius: 6px;
  color: white;
  &:disabled {
    background-color: #595959;
  }
  &:hover {
    background-color: #818181;
  }
  &:active {
    background-color: #818181;
  }
`;

const TextareaWrapper = styled.div`
  position: relative;
  background-color: #1e2128ff;
  border-radius: 10px;
  padding: 8px 8px 8px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 1px;
  width: 90%;
  height: 45%;
  z-index: 1;
  top: -40px;
`;

export const BlackLayer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 55%;
  position: absolute;
`;
