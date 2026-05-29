import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchEvents, removeEvent } from '../../features/events/eventsSlice';
import { isFutureEvent } from '../../utils/dateFormatter';
import EventCard from '../../components/EventCard';
import ConfirmDialog from '../../components/ConfirmDialog';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

type SortField = 'dateTime' | 'name';
type SortOrder = 'asc' | 'desc';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.events,
  );

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('dateTime');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filtered = useMemo(() => {
    return items
      .filter((e) =>
        tab === 0 ? isFutureEvent(e.dateTime) : !isFutureEvent(e.dateTime),
      )
      .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const valA = sortField === 'name' ? a.name : a.dateTime;
        const valB = sortField === 'name' ? b.name : b.dateTime;
        const cmp = valA < valB ? -1 : valA > valB ? 1 : 0;
        return sortOrder === 'asc' ? cmp : -cmp;
      });
  }, [items, tab, search, sortField, sortOrder]);

  const handleDeleteConfirm = (): void => {
    if (deleteId) {
      dispatch(removeEvent(deleteId));
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
        <TextField
          label="Pesquisar por nome"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sortField}
            label="Ordenar por"
            onChange={(e) => setSortField(e.target.value as SortField)}
          >
            <MenuItem value="dateTime">Data</MenuItem>
            <MenuItem value="name">Nome</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Ordem</InputLabel>
          <Select
            value={sortOrder}
            label="Ordem"
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          >
            <MenuItem value="asc">Crescente</MenuItem>
            <MenuItem value="desc">Decrescente</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Tabs value={tab} onChange={(_, v) => setTab(v as number)} sx={{ mb: 3 }}>
        <Tab label="Eventos Futuros" />
        <Tab label="Eventos Passados" />
      </Tabs>

      {filtered.length === 0 ? (
        <Typography color="text.secondary">Nenhum evento encontrado.</Typography>
      ) : (
        filtered.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onDelete={(id) => setDeleteId(id)}
          />
        ))
      )}

      <ConfirmDialog
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
};

export default Home;
