export type EventCategory =
  | 'Conferência'
  | 'Workshop'
  | 'Webinar'
  | 'Networking'
  | 'Outro';

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  dateTime: string;
  location: string;
  category: EventCategory;
  createdAt: string;
  updatedAt: string;
}

export type IEventFormData = Omit<IEvent, '_id' | 'createdAt' | 'updatedAt'>;
