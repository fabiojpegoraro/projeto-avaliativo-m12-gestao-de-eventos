import { Schema, model } from 'mongoose';
import type { IEvent } from '../types/event.types';

const EVENT_CATEGORIES = [
  'Conferência',
  'Workshop',
  'Webinar',
  'Networking',
  'Outro',
] as const;

const eventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: EVENT_CATEGORIES,
      default: 'Conferência',
    },
  },
  {
    timestamps: true,
  },
);

const Event = model<IEvent>('Event', eventSchema);

export default Event;
