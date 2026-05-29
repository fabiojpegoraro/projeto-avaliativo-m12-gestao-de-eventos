import Event from '../models/Event';
import type { IEvent, IEventDocument } from '../types/event.types';

export const findAllEvents = async (): Promise<IEventDocument[]> => {
  return Event.find().sort({ dateTime: 1 }).lean<IEventDocument[]>();
};

export const findEventById = async (
  id: string,
): Promise<IEventDocument | null> => {
  return Event.findById(id).lean<IEventDocument>();
};

export const createEvent = async (data: IEvent): Promise<IEventDocument> => {
  const event = new Event(data);
  return event.save() as unknown as IEventDocument;
};

export const updateEvent = async (
  id: string,
  data: Partial<IEvent>,
): Promise<IEventDocument | null> => {
  return Event.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean<IEventDocument>();
};

export const deleteEvent = async (
  id: string,
): Promise<IEventDocument | null> => {
  return Event.findByIdAndDelete(id).lean<IEventDocument>();
};
