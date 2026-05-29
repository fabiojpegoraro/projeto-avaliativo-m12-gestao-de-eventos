import api from './api';
import type { IEvent, IEventFormData } from '../types/event.types';

export const fetchAllEvents = async (): Promise<IEvent[]> => {
  const { data } = await api.get<IEvent[]>('/events');
  return data;
};

export const fetchEventById = async (id: string): Promise<IEvent> => {
  const { data } = await api.get<IEvent>(`/events/${id}`);
  return data;
};

export const createEvent = async (payload: IEventFormData): Promise<IEvent> => {
  const { data } = await api.post<IEvent>('/events', payload);
  return data;
};

export const updateEvent = async (
  id: string,
  payload: IEventFormData,
): Promise<IEvent> => {
  const { data } = await api.put<IEvent>(`/events/${id}`, payload);
  return data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};
