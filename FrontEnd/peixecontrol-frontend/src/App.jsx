import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { GlobalStyles } from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
