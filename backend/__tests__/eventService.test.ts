import * as eventService from '../src/services/eventService';
import Event from '../src/models/Event';

jest.mock('../src/models/Event');

const mockEvent = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Evento Teste',
  description: 'Descrição do evento',
  dateTime: new Date('2026-12-01T10:00:00Z'),
  location: 'Local Teste',
  category: 'Conferência' as const,
};

describe('eventService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllEvents', () => {
    it('deve retornar lista de eventos ordenada por data', async () => {
      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue([mockEvent]),
      };
      (Event.find as jest.Mock).mockReturnValue(mockFind);

      const result = await eventService.findAllEvents();

      expect(Event.find).toHaveBeenCalledTimes(1);
      expect(mockFind.sort).toHaveBeenCalledWith({ dateTime: 1 });
      expect(result).toEqual([mockEvent]);
    });
  });

  describe('findEventById', () => {
    it('deve retornar um evento pelo ID', async () => {
      const mockFindById = {
        lean: jest.fn().mockResolvedValue(mockEvent),
      };
      (Event.findById as jest.Mock).mockReturnValue(mockFindById);

      const result = await eventService.findEventById(mockEvent._id);

      expect(Event.findById).toHaveBeenCalledWith(mockEvent._id);
      expect(result).toEqual(mockEvent);
    });

    it('deve retornar null quando evento não existe', async () => {
      const mockFindById = {
        lean: jest.fn().mockResolvedValue(null),
      };
      (Event.findById as jest.Mock).mockReturnValue(mockFindById);

      const result = await eventService.findEventById('id-inexistente');

      expect(result).toBeNull();
    });
  });

  describe('deleteEvent', () => {
    it('deve deletar e retornar o evento removido', async () => {
      const mockFindByIdAndDelete = {
        lean: jest.fn().mockResolvedValue(mockEvent),
      };
      (Event.findByIdAndDelete as jest.Mock).mockReturnValue(
        mockFindByIdAndDelete,
      );

      const result = await eventService.deleteEvent(mockEvent._id);

      expect(Event.findByIdAndDelete).toHaveBeenCalledWith(mockEvent._id);
      expect(result).toEqual(mockEvent);
    });
  });
});
