import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import './styles/global.css';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
