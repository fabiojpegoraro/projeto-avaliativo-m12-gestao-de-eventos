import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as eventService from '../../services/eventService';
import type { IEvent, IEventFormData } from '../../types/event.types';

interface EventsState {
  items: IEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk('events/fetchAll', async () => {
  return eventService.fetchAllEvents();
});

export const addEvent = createAsyncThunk(
  'events/add',
  async (payload: IEventFormData) => {
    return eventService.createEvent(payload);
  },
);

export const editEvent = createAsyncThunk(
  'events/edit',
  async ({ id, payload }: { id: string; payload: IEventFormData }) => {
    return eventService.updateEvent(id, payload);
  },
);

export const removeEvent = createAsyncThunk(
  'events/remove',
  async (id: string) => {
    await eventService.deleteEvent(id);
    return id;
  },
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchEvents
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<IEvent[]>) => {
          state.loading = false;
          state.items = action.payload;
        },
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro ao buscar eventos.';
      })
      // addEvent
      .addCase(addEvent.fulfilled, (state, action: PayloadAction<IEvent>) => {
        state.items.push(action.payload);
      })
      // editEvent
      .addCase(editEvent.fulfilled, (state, action: PayloadAction<IEvent>) => {
        const index = state.items.findIndex(
          (e) => e._id === action.payload._id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // removeEvent
      .addCase(
        removeEvent.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter((e) => e._id !== action.payload);
        },
      );
  },
});

export default eventsSlice.reducer;
