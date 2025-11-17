import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  background_image,
  chatBubble_light,
  nova_logo,
} from '../styles/images';

const CLICK_COUNT = 7;
const CLICK_TIME = 300;

const MainPage = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const lastClickTimeRef = useRef<number>(0);
  const handleLogoClick = () => {
    const now = new Date().getTime();
    if (now - lastClickTimeRef.current < CLICK_TIME) {
      setClickCount(clickCount + 1);
      console.log(clickCount);
      if (clickCount >= CLICK_COUNT) {
        navigate('/master');
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    lastClickTimeRef.current = now;
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <>
      <MainWrapper>
        <BackgroundImage src={background_image} />
        <MainLogoImage onClick={handleLogoClick} src={nova_logo} />
        <MainButtonWrapper>
          <MainButton
            onClick={() => {
              navigate('/setlist');
            }}
          >
            SETLIST
          </MainButton>
          <MainButton
            onClick={() => {
              navigate('/ticket');
            }}
          >
            EVENT
          </MainButton>
        </MainButtonWrapper>
        <ChatImageLight
          src={chatBubble_light}
          onClick={() => {
            navigate('/comment');
          }}
        />
      </MainWrapper>
    </>
  );
};

export default MainPage;

export const ChatImageLight = styled.img`
  position: absolute;
  width: 20%;
  z-index: 1;
  cursor: pointer;
  bottom: 0;
  right: -5px;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 92dvh; // 모바일 브라우저 상/하단바 고려해 dynamic viewport height 적용
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding-top: 60px;
  padding-bottom: 80px;
  overflow: hidden;
`;

const MainButton = styled.button`
  text-align: center;
  background-color: #181a1f;
  color: white;
  width: 68%;
  height: 7dvh;
  font-size: 18px;
  padding: 0 20px 0 20px;
  border-radius: 26px;
  position: relative;
  z-index: 1;
  &:hover {
    background-color: gray;
  }
`;

const MainButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
`;

const MainLogoImage = styled.img`
  width: 68%;
  position: relative;
  z-index: 1;
`;
