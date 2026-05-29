import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import type { IEvent } from '../../types/event.types';
import { formatDateTime } from '../../utils/dateFormatter';

interface EventCardProps {
  event: IEvent;
  onDelete: (id: string) => void;
}

const EventCard = ({ event, onDelete }: EventCardProps) => {
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {event.description}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">📅 {formatDateTime(event.dateTime)}</Typography>
          <Typography variant="body2">📍 {event.location}</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Chip label={event.category} size="small" />
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/events/${event._id}/edit`)}>
          Editar
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(event._id)}>
          Excluir
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
