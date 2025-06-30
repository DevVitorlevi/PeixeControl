import styled from 'styled-components';

export const ReportsContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

export const ReportCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  margin-bottom: 30px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 30px auto;
  }
`;

export const ReportsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 30px auto;
  }
`;

export const ReportListItem = styled.li`
  background-color: #ecf0f1;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #34495e;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto 10px auto;
  }
`;
