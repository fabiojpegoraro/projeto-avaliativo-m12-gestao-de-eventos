import { describe, it, expect } from 'vitest';
import eventsReducer, {
  fetchEvents,
  removeEvent,
} from '../features/events/eventsSlice';
import type { IEvent } from '../types/event.types';

const mockEvent: IEvent = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Evento Teste',
  description: 'Descrição do evento teste',
  dateTime: '2026-12-01T10:00:00.000Z',
  location: 'Local Teste',
  category: 'Conferência',
  createdAt: '2026-05-01T00:00:00.000Z',
  updatedAt: '2026-05-01T00:00:00.000Z',
};

describe('eventsSlice', () => {
  const initialState = { items: [], loading: false, error: null };

  it('deve retornar o estado inicial', () => {
    expect(eventsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('deve definir loading como true em fetchEvents.pending', () => {
    const action = { type: fetchEvents.pending.type };
    const state = eventsReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('deve preencher items em fetchEvents.fulfilled', () => {
    const action = { type: fetchEvents.fulfilled.type, payload: [mockEvent] };
    const state = eventsReducer(initialState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe('Evento Teste');
    expect(state.loading).toBe(false);
  });

  it('deve remover item em removeEvent.fulfilled', () => {
    const stateWithItem = { items: [mockEvent], loading: false, error: null };
    const action = { type: removeEvent.fulfilled.type, payload: mockEvent._id };
    const state = eventsReducer(stateWithItem, action);
    expect(state.items).toHaveLength(0);
  });
});
