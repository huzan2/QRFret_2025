import { useNavigate } from 'react-router-dom';
import background_image from '../assets/background_image.png';
import { BackgroundImage, MainWrapper } from './MainPage';
import { BlackLayer } from './CommentPage';
import { Description, StyledButton, Title } from './TicketPage';
import styled from 'styled-components';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainWrapper>
        <BlackLayer>
          <BackgroundImage src={background_image} />
        </BlackLayer>
        <NotFoundWrapper>
          <Title style={{ zIndex: 10, position: 'relative' }}>
            404 Not Found
          </Title>
          <Description style={{ zIndex: 10, position: 'relative' }}>
            잘못된 접근입니다
          </Description>
          <StyledButton
            style={{ zIndex: 10, position: 'relative' }}
            onClick={() => {
              navigate('/');
            }}
          >
            돌아가기
          </StyledButton>
        </NotFoundWrapper>
      </MainWrapper>
    </>
  );
};

export default NotFoundPage;

const NotFoundWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
