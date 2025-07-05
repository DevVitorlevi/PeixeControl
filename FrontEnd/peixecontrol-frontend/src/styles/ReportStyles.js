import styled from 'styled-components';

export const ReportsContainer = styled.div`
  width: 100%;
  max-width: 1100px;  /* Largura máxima centralizada */
  margin: 0 auto;     /* Centraliza horizontalmente */
  padding: 20px 15px; /* Espaçamento interno horizontal e vertical */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

export const HeaderControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const ExportControls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  select {
    flex: 1 1 150px;
    min-width: 120px;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 1rem;
    box-sizing: border-box;
  }

  button {
    flex: 1 1 120px;
    min-width: 110px;
    padding: 8px 12px;
    border-radius: 6px;
    background-color: #27ae60;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    box-sizing: border-box;

    &:hover {
      background-color: #1e8449;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2e64ee;
  margin-bottom: 0.8rem;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const ReportsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const ReportListItem = styled.li`
  background-color: rgb(242, 48, 35);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 12px 15px;
  }
`;

export const CartList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const CartItem = styled.li`
  background-color: #084298;
  padding: 18px 22px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  color: #fff;
  transition: background-color 0.3s;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(24, 118, 212);
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    padding: 14px 18px;
    flex-direction: column;
    gap: 6px;
    align-items: flex-start;
  }
`;

export const DailySummaryCard = styled.div`
  background-color: #e8f5e9;
  border: 2px solid #2ecc71;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 1rem;
  width: 100%;
  max-width: 700px;
  text-align: center;
  box-sizing: border-box;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    color: #27ae60;
  }

  p {
    font-size: 1.6rem;
    color: #27ae60;
    font-weight: bold;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;

export const MonthSummaryCard = styled(DailySummaryCard)`
  max-width: 500px;

  h3 {
    font-size: 1.4rem;
  }

  p {
    font-size: 1.2rem;
  }
`;

export const ReportModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &.open {
    opacity: 1;
    pointer-events: auto;
  }
`;

export const ReportModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &.open {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    color: #34495e;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 10px;
    font-size: 1.4rem;
    color: rgb(245, 193, 7);
    font-weight: bold;
  }

  p {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.6rem;
    color: rgb(49, 107, 231);
  }

  @media (max-width: 480px) {
    padding: 20px;
    h2 {
      font-size: 1.5rem;
    }
    li {
      font-size: 1.2rem;
    }
    p {
      font-size: 1.3rem;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

export const Card = styled.div`
  background-color: #f7f7f7;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  
  input {
    margin-top: 10px;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1.4rem;
    width: 100%;
    cursor: pointer;
    color: #3700ff;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }
`;

export const FullWidthCard = styled(Card)`
  grid-column: span 2;

  input {
    margin-bottom: 0.9rem;
    color: #3700ff;
    width: 100%;
    max-width: 300px;
  }

  @media (max-width: 600px) {
    grid-column: span 1;
  }
`;

export const TopActionsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  box-sizing: border-box;

  .left {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
      margin-bottom: 10px;
    }
  }

  .right {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    select {
      flex: 1 1 140px;
      min-width: 130px;
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #ccc;
      cursor: pointer;
      font-size: 1rem;
      box-sizing: border-box;
    }

    button {
      flex: 1 1 130px;
      min-width: 120px;
      padding: 8px 12px;
      border-radius: 5px;
      background-color: #27ae60;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;
      box-sizing: border-box;

      &:hover {
        background-color: #1e8449;
      }
    }

    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
      margin-bottom: 10px;
    }
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

export const PaginationButton = styled.button`
  background-color: #084298;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #2c80b4;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

export const PaginationPageInfo = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: #084298;
  align-self: center;
`;

