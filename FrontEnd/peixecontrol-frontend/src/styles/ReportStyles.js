import styled from 'styled-components';

export const ReportsContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderControls = styled.div`
  width: 100%;
  max-width: 1300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ExportControls = styled.div`
  display: flex;
  gap: 10px;

  select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    font-size: 1rem;
  }

  button {
    padding: 8px 12px;
    border-radius: 5px;
    background-color: #27ae60;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #1e8449;
    }
  }
`;

export const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #084298;
  text-align: center;
  margin-bottom: .8rem;
  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const ReportsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  width: 100%;
  max-width: 500px;
`;

export const ReportListItem = styled.li`
  background-color: rgb(242, 48, 35);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
`;

export const CartList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CartItem = styled.li`
  background-color: #084298;
  padding: 20px 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
  font-size: 1.4rem;
  color: rgb(255, 255, 255);
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(24, 118, 212);
  }
`;

export const DailySummaryCard = styled.div`
  background-color: #e8f5e9;
  border: 2px solid #2ecc71;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 1rem;
  text-align: center;
  h3 {
    font-size: 1.8rem;
    margin-bottom: .8rem;
    color: #27ae60;
  }

  p {
    font-size: 1.6rem;
    color: #27ae60;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export const MonthSummaryCard = styled.div`
  background-color: #e8f5e9;
  border: 2px solid #2ecc71;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-top: 1rem;
  text-align: center;
  width: 100%;
  h3 {
    font-size: 1.4rem;
    margin-bottom: .8rem;
    color: #27ae60;
  }

  p {
    font-size: 1.2rem;
    color: #27ae60;
    font-weight: bold;
    margin-bottom: 10px;
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
  max-width: 700px;
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
    font-size: 1.5rem;
    color: rgb(245, 193, 7);
    font-weight: bold;
  }

  p {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.8rem;
    color: rgb(49, 107, 231);
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1300px;
  margin-bottom: 2rem;
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

  }
`;

export const FullWidthCard = styled(Card)`
  grid-column: span 2;
  position: relative;
  input{
    margin-bottom: .9rem;
    color:#3700ff;
    width: 13rem;
  }
  @media (max-width: 1120px) {
    grid-column: span 1;
  }
`;