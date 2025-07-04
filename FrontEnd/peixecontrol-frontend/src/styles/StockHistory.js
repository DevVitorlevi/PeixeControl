import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
  input{
    color:#188cf8;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2e64ee;
  margin-bottom: 24px;
  text-align: center;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;

  th, td {
    padding: 12px 16px;
    text-align: left;
  }

  thead {
    background-color: #084298;
    color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #f7f7f7;
  }

  tbody tr:hover {
    background-color: #d1e3ff;
    cursor: pointer;
  }

  th {
    user-select: none;
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const PageButton = styled.button`
  background-color: ${props => (props.active ? '#084298' : '#e0e0e0')};
  color: ${props => (props.active ? 'white' : '#333')};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover:not(:disabled) {
    background-color: #084298;
    color: white;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 40px;
  font-size: 1.1rem;
`;

export const Loader = styled.div`
  margin: 60px auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #084298;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const DatePickerContainer = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-weight: 600;
  }

  input[type="date"] {
    padding: 6px 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;

export const SummaryContainer = styled.div`
  margin-bottom: 20px;
  background-color: #e7f5ff;
  padding: 12px 20px;
  border-radius: 8px;
  color: #1c7ed6;
  font-weight: 600;
  font-size: 1.1rem;
`;

