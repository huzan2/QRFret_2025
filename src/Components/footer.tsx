import { FiHome } from 'react-icons/fi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MOBILE_MAX_WIDTH = '480px';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const handleClickFooter = () => {
    navigate('/');
  };
  return (
    <FooterWrapper>
      <FooterIconContainer onClick={handleClickFooter}>
        <FiHome size={24} />
        Home
      </FooterIconContainer>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8dvh;
  position: fixed;
  bottom: 0;
  z-index: 100;
  max-width: ${MOBILE_MAX_WIDTH};
`;

const FooterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  gap: 3px;
  cursor: pointer;
`;
