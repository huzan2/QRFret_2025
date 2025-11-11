import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminStore } from '../store/adminStore';

const PasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAdminStore((state) => state.login);
  const handleSubmit = () => {
    const loginSuccess = login(password);
    if (!loginSuccess) {
      alert('암호가 틀렸습니다!');
      navigate('/', { replace: true });
    }
  };
  return (
    <>
      <PageContainer>
        <Title>관리자 인증</Title>
        <Description>관리자 페이지 입장 전 암호를 확인해주세요</Description>
        <StyledInput
          type='password'
          placeholder='암호 입력'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <StyledButton onClick={handleSubmit}>확인</StyledButton>
      </PageContainer>
    </>
  );
};

export default PasswordPage;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
`;

const PageContainer = styled.div`
  height: 92dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background-color: #171a1fff;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 32px;

  &:hover {
    background-color: #818181;
  }

  &:active {
    background-color: #818181;
  }

  &:disabled {
    background-color: #c0c8d1;
    cursor: not-allowed;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 30px;
  background-color: #171a1fff;
  color: white;

  &::placeholder {
    color: #868686;
  }

  &:focus {
    outline: none;
    border-color: #8a9cae;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: white;
  margin: 0;
  margin-bottom: 40px;
`;
