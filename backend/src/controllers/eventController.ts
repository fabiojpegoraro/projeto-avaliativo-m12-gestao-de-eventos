import type { Request, Response, NextFunction } from 'express';
import * as eventService from '../services/eventService';

type IdParams = { id: string };

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const events = await eventService.findAllEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await eventService.findEventById(id);
    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado.' });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await eventService.updateEvent(id, req.body);
    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado.' });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await eventService.deleteEvent(id);
    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado.' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
