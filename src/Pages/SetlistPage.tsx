import { GoChevronLeft } from 'react-icons/go';
import { EventTitle, HeaderWrapper } from './TicketPage';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosHeartEmpty } from 'react-icons/io';
import { setlist } from '../setlist';
import { useLikeService } from '../hooks/useLikeService';
import {
  useLikeStore,
  useLikeCountStore,
  useLikePendingStore,
} from '../store/likeStore';
import React, { useEffect, useState } from 'react';
import lineIcon from '../assets/lineImage.png';

interface LikeButtonProps {
  itemId: string;
}

const OriginalLyrics = `
    답답한 세상 속
숨쉴 곳 하나 없고
내게 바라는 건
계속 늘어만 가는데

도망치고 싶어
다 두고 떠나고 싶어
모든 걸 털어 놓고
세상에 소리칠래

반복되는 일상 우리
도망치지 않을래?
눈치 보지마 더 이상
함께 떠나볼래

다 필요 없어 (없어)
우리 둘만 있으면 돼
두 려울 건 없어 (없어)
바로 지금이야

전부 때려쳐
이 순간에만 집중해
크게 소리쳐
고민 하지마

복잡한 도로 위
여유는 하나 없고
수많은 질문들
나를 채워만 가는데

쏟아내고 싶어
더 이상 참지 않을래
어차피 지나고 나면 별 일 아닐 거야

떠나버린 과거 괜히
돌아보지 않을래
걱정하지 마 더 이상
좋은 것만 생각해

다 필요 없어 (없어)
우리 둘만 있으면 돼
두 려울 건 없어 (없어)
바로 지금이야

전부 때려쳐
이 순간에만 집중해
크게 소리쳐
고민 하지마

그런~눈으로 나를
바라보지 마요
그대도 나와 같이
지쳐 있잖아요

그대의 아픔도 그때의 슬픔도
모두 다 알아요 오

바보 같던 나 겁이 났던 날
아무리 욕해도 신경 안 쓸래

누~가 뭐래도 상~관 안 할래 
`;

const LikeButton: React.FC<LikeButtonProps> = ({ itemId }) => {
  const isLiked = useLikeStore((state) => state.likedItems.includes(itemId));
  const count = useLikeCountStore((state) => state.counts[itemId] ?? 0);
  const pendingItemId = useLikePendingStore((state) => state.pendingItemId);
  const { handleToggleLike } = useLikeService();
  const isLoading = pendingItemId === itemId;
  const handleClick = () => {
    if (isLoading) return;
    handleToggleLike(itemId, isLiked);
  };
  return (
    <HeartContainer onClick={handleClick}>
      <StyledHeart $isLiked={isLiked} />
      <LikedNumber $isLiked={isLiked}>{count}</LikedNumber>
    </HeartContainer>
  );
};

const SetlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchAllCounts } = useLikeService();
  const [showDropDown, setShowDropDown] = useState(false);
  useEffect(() => {
    fetchAllCounts();
  }, [fetchAllCounts]);
  return (
    <>
      <PageContainer>
        <HeaderWrapper>
          <GoChevronLeft
            color='white'
            style={{ cursor: 'pointer' }}
            size={25}
            onClick={() => {
              navigate('/');
            }}
          />
          <EventTitle>SETLIST</EventTitle>
          <GoChevronLeft size={25} color='black' />
        </HeaderWrapper>
        <SetlistContainer>
          {setlist.map((song, idx) => (
            <React.Fragment key={idx}>
              {idx % 12 === 0 ? (
                <ChapterTitle>{idx / 12 + 1}부</ChapterTitle>
              ) : null}
              <SubContainer>
                <SongContainer>
                  <SongNumber>{(idx % 12) + 1}</SongNumber>
                  <SongTitleWrapper>
                    <Title>{song.title}</Title>
                    <Description>{song.artist}</Description>
                  </SongTitleWrapper>
                  <IconWrapper>
                    {song.idx === 22 ? (
                      <StyleLineIcon
                        onClick={() => {
                          setShowDropDown(!showDropDown);
                        }}
                        src={lineIcon}
                      />
                    ) : null}
                    <LikeButton itemId={idx.toString()} />
                  </IconWrapper>
                </SongContainer>
                {showDropDown && song.idx === 22 ? (
                  <LyricsContainer>
                    <LyricsText>{OriginalLyrics}</LyricsText>
                  </LyricsContainer>
                ) : null}
              </SubContainer>
            </React.Fragment>
          ))}
        </SetlistContainer>
      </PageContainer>
    </>
  );
};

export default SetlistPage;

const SubContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid #32374380;
  align-items: center;
`;

const LyricsContainer = styled.div`
  width: 70%;
`;

const LyricsText = styled.p`
  color: #bdc1caff;
  text-align: center;
  white-space: pre-wrap;
  padding-bottom: 20px;
  font-size: 15px;
`;

const IconWrapper = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

const StyleLineIcon = styled.img`
  width: 60%;
  height: 60%;
`;

const ChapterTitle = styled.p`
  width: 100%;
  font-size: 20px;
  color: #f3f4f6ff;
  padding: 30px 0 0 15px;
`;

const HeartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const LikedNumber = styled.p<{ $isLiked: boolean }>`
  color: ${(props) => (props.$isLiked ? '#ff0000' : '#bdc1caff')};
  font-size: 12px;
`;

const StyledHeart = styled(IoIosHeartEmpty)<{ $isLiked: boolean }>`
  font-size: 20px;
  color: ${(props) => (props.$isLiked ? '#ff0000' : '#ffffff')};
  cursor: pointer;
`;

const Title = styled.p`
  color: white;
  font-size: 16px;
`;
const Description = styled.p`
  font-size: 14px;
  color: #bdc1caff;
`;

const SongTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 75%;
  gap: 8px;
`;

const SongNumber = styled.p`
  font-size: 14px;
  color: #bdc1caff;
  padding: 0 0 0 10px;
`;

const SongContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px 20px 10px;
`;

const PageContainer = styled.div`
  height: 92dvh;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SetlistContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 8dvh;
`;
