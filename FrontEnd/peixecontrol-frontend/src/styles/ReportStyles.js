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
  margin-bottom: 20px;
  text-align: center;
`;

export const ReportCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  margin-top: 2rem;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 20px auto;
  }
`;

export const ReportsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 20px auto;
  }
`;

export const ReportListItem = styled.li`
  background-color:rgb(242, 48, 35);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  color:rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto 10px auto;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ $active }) => ($active ? '#2980b9' : '#bdc3c7')};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c5980;
  }
`;

export const AlertCard = styled.div`
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  padding: 15px 20px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 20px auto;
  }
`;

export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 20px auto;
  }
`;

export const DateInput = styled.input`
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1e8449;
  }
`;

export const ReportModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ReportModalContent = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 700px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

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
export const DailySummaryCard = styled.div`
  background-color: #e8f5e9; /* Verde bem claro */
  border: 2px solid #2ecc71; /* Verde vivo para borda */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  width: 60vw;

  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto 20px auto;
  }

  h3 {
    font-size: 1.8rem;
    color: #27ae60;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.6rem;
    color: #27ae60;
    font-weight: bold;
    margin-bottom: 10px;
  }

  span {
    color: #145a32;
    font-weight: bold;
    font-size: 1.4rem;
  }
`;