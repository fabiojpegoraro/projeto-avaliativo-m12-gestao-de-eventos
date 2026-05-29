import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Gestão de Eventos
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/events/new')}
        >
          Cadastrar Eventos
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
