import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTicketStore } from '../store/ticketStore';
import { useTicketService } from '../hooks/useTicketService';
import { GoChevronLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

export const Description = styled.p`
  font-size: 0.95rem;
  color: #cecece;
  margin: 0;
  margin-bottom: 40px;
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

export const StyledButton = styled.button`
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

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  white-space: pre-line;
  text-align: left;
`;

const TicketPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const currentTicket = useTicketStore((state) => state.ticket);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const unsubscribe = useTicketStore.persist.onFinishHydration(() => {
      setIsHydrating(false);
    });
    if (useTicketStore.persist.hasHydrated()) {
      setIsHydrating(false);
    }
    console.log(currentTicket);
    return () => {
      document.body.style.overflow = 'auto';
      unsubscribe();
    };
  }, []);

  const footerMessage = `1부와 2부 사이에 경품 추첨 이벤트가 진행될 예정입니다.
다양한 상품이 준비되어 있으니, 전화번호를 입력해 추첨
이벤트에 참여해 보세요!`;

  const { requestTicket } = useTicketService();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!phoneNumber || phoneNumber.length < 13) {
      alert('전화번호를 확인해주세요.');
      return;
    }
    e.preventDefault();
    setLoading(true);
    console.log('입력된 번호:', phoneNumber);
    await requestTicket(phoneNumber);
    setLoading(false);
  };
  if (isHydrating) {
    return (
      <PageContainer>
        <div>loading...</div>
      </PageContainer>
    );
  }
  function regPhoneNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const result = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
    setPhoneNumber(result);
  }

  return (
    <>
      <PageContainer>
        <HeaderWrapper>
          <GoChevronLeft
            style={{ cursor: 'pointer' }}
            color='white'
            size={25}
            onClick={() => {
              navigate('/');
            }}
          />
          <EventTitle>EVENT</EventTitle>
          <GoChevronLeft color='black' size={25} />
        </HeaderWrapper>
        {currentTicket ? (
          <PageContainer>
            <NumberWrapper>
              <NumberDescription>Your Lucky Number Is</NumberDescription>
              <TicketNumber>{currentTicket.ticketNumber}</TicketNumber>
              <NumberDescription>{currentTicket.phoneNumber}</NumberDescription>
            </NumberWrapper>
          </PageContainer>
        ) : (
          <>
            <InputPageContainer>
              <Title>추첨권 등록</Title>

              <Description>
                추첨번호 등록을 위하여 전화번호를 입력해주세요!
              </Description>

              <StyledInput
                type='tel'
                placeholder='010-1234-5678'
                value={phoneNumber}
                onChange={regPhoneNumber}
                disabled={loading}
                itemType='number'
                maxLength={13}
              />

              <StyledButton onClick={handleSubmit} disabled={loading}>
                {loading ? '등록 중...' : '확인'}
              </StyledButton>

              <FooterText>{footerMessage}</FooterText>
            </InputPageContainer>
          </>
        )}
      </PageContainer>
    </>
  );
};

export default TicketPage;

const InputPageContainer = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

export const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
`;

const NumberDescription = styled.p`
  font-size: 16px;
  color: #bdc1caff;
`;

const TicketNumber = styled.p`
  color: white;
  font-size: 72px;
`;

const NumberWrapper = styled.div`
  background-color: #1e2128ff;
  border-radius: 16px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  padding: 20px 0 20px 0;
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

export const EventTitle = styled.p`
  color: white;
  font-size: 18px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  padding: 20px 20px 20px 20px;
  border-bottom: solid 1px #323743ff;
`;
