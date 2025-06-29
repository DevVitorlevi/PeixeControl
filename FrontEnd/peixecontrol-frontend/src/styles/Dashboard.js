import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  flex: 1 1 300px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const Title = styled.h2`
  margin: 0 0 10px 0;
  color: #0f52ba;
`;

 export const Value = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;