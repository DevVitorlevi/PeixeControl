import styled from 'styled-components';

export const DashboardContainer = styled.div`
  width: 100%;
`;

export const Greeting = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 35px;
  text-align: center;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 30px 25px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  flex: 1;
  min-width: 280px;
  max-width: 320px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    width: 90%;
    max-width: none;
    margin-bottom: 25px;
  }
`;

export const CardTitle = styled.h3`
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #2980b9;
`;

export const CardValue = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  color: #34495e;
`;
