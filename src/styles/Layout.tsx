import styled from 'styled-components';
const MOBILE_MAX_WIDTH = '480px';

const AppContainer = styled.div`
  // 모바일 스타일 (기본값)
  width: 100%;
  min-height: 100%;
  background-color: #ffffff;

  // PC 환경 스타일: width가 MOBILE_MAX_WIDTH보다 커지면 미디어쿼리 적용
  @media (min-width: ${MOBILE_MAX_WIDTH}) {
    max-width: ${MOBILE_MAX_WIDTH};
    margin: 0 auto;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <AppContainer>{children}</AppContainer>;
};

export default Layout;
