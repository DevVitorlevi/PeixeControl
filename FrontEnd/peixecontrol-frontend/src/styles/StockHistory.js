import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #222;

  input {
    color: #188cf8;
    font-size: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  color: #2e64ee;
  margin-bottom: 24px;
  text-align: center;
  user-select: none;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  min-width: 600px;

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  thead {
    background-color: #084298;
    color: #fff;
  }

  tbody tr:nth-child(even) {
    background-color: #f9faff;
  }

  tbody tr:hover {
    background-color: #d1e3ff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  th {
    user-select: none;
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const PageButton = styled.button`
  background-color: ${props => (props.active ? '#084298' : '#e0e0e0')};
  color: ${props => (props.active ? 'white' : '#333')};
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: ${props => (props.active ? '0 0 8px #084298aa' : 'none')};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #084298;
    color: white;
    box-shadow: 0 0 8px #084298cc;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  margin-top: 60px;
  font-size: 1.2rem;
  font-style: italic;
`;

export const Loader = styled.div`
  margin: 60px auto;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #084298;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const DatePickerContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;

  label {
    font-weight: 600;
    font-size: 1rem;
    user-select: none;
  }

  input[type="date"] {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1.5px solid #ccc;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #084298;
      box-shadow: 0 0 5px #084298aa;
    }
  }
`;

export const SummaryContainer = styled.div`
  margin-bottom: 28px;
  background-color: #e7f5ff;
  padding: 16px 24px;
  border-radius: 10px;
  color: #1c7ed6;
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(28, 126, 214, 0.3);
`;
