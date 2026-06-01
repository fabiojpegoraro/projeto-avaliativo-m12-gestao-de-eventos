export type EventCategory =
  | 'Conferência'
  | 'Workshop'
  | 'Webinar'
  | 'Networking'
  | 'Outro';

export interface IEvent {
  name: string;
  description: string;
  dateTime: Date;
  location: string;
  category: EventCategory;
}

export interface IEventDocument extends IEvent {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
