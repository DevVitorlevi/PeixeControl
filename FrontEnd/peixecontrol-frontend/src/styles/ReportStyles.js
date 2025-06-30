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

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  background-color: ${({ $active }) => ($active ? '#3498db' : '#ecf0f1')};
  color: ${({ $active }) => ($active ? '#fff' : '#2c3e50')};
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
    color: white;
  }
`;

export const AlertCard = styled.div`
  background-color: #f39c12;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`;

/* Histórico Visual */
export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const CartItem = styled.div`
  background-color: white;
  border: 1px solid #bdc3c7;
  border-radius: 12px;
  padding: 15px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #ecf0f1;
    transform: scale(1.02);
  }

  span {
    font-size: 1rem;
    color: #2c3e50;
  }
`;

/* Modal */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px 20px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;

  h2 {
    margin-bottom: 15px;
    color: #2c3e50;
    text-align: center;
  }

  p {
    margin-bottom: 10px;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 15px;

    li {
      margin-bottom: 8px;
    }
  }
`;
