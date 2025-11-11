import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/footer';
const MOBILE_MAX_WIDTH = '480px';

const AppContainer = styled.div`
  // 모바일 스타일 (기본값)
  width: 100%;
  min-height: 100%;
  background-color: black;
  padding-bottom: 70px;

  // PC 환경 스타일: width가 MOBILE_MAX_WIDTH보다 커지면 미디어쿼리 적용
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    max-width: ${MOBILE_MAX_WIDTH};
    margin: 0 auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
  }
`;

const Layout: React.FC = () => {
  return (
    <AppContainer>
      <Outlet />
      <Footer />
    </AppContainer>
  );
};

export default Layout;
