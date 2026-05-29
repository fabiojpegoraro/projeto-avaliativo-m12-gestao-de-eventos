import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { addEvent, editEvent } from '../../features/events/eventsSlice';
import { fetchEventById } from '../../services/eventService';
import { eventSchema, EVENT_CATEGORIES } from '../../utils/eventSchema';
import type { EventSchema } from '../../utils/eventSchema';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const isEditing = Boolean(id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: { category: 'Conferência' },
  });

  useEffect(() => {
    if (id) {
      fetchEventById(id).then((event) => {
        reset({
          name: event.name,
          description: event.description,
          dateTime: event.dateTime.slice(0, 16),
          location: event.location,
          category: event.category,
        });
      });
    }
  }, [id, reset]);

  const onSubmit = async (data: EventSchema): Promise<void> => {
    if (isEditing && id) {
      await dispatch(editEvent({ id, payload: data }));
    } else {
      await dispatch(addEvent(data));
    }
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEditing ? 'Editar Evento' : 'Cadastrar Evento'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Nome"
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            fullWidth
          />
          <TextField
            label="Descrição"
            {...register('description')}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            fullWidth
          />
          <TextField
            label="Data e Hora"
            type="datetime-local"
            {...register('dateTime')}
            error={Boolean(errors.dateTime)}
            helperText={errors.dateTime?.message}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
          <TextField
            label="Local"
            {...register('location')}
            error={Boolean(errors.location)}
            helperText={errors.location?.message}
            fullWidth
          />
          <FormControl fullWidth error={Boolean(errors.category)}>
            <InputLabel>Categoria</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Categoria">
                  {EVENT_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.category && (
              <FormHelperText>{errors.category.message}</FormHelperText>
            )}
          </FormControl>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Salvar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default EventForm;
