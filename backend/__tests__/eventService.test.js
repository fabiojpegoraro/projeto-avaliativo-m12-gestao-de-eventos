"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventService = __importStar(require("../src/services/eventService"));
const Event_1 = __importDefault(require("../src/models/Event"));
jest.mock('../src/models/Event');
const mockEvent = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Evento Teste',
    description: 'Descrição do evento',
    dateTime: new Date('2026-12-01T10:00:00Z'),
    location: 'Local Teste',
    category: 'Conferência',
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
            Event_1.default.find.mockReturnValue(mockFind);
            const result = await eventService.findAllEvents();
            expect(Event_1.default.find).toHaveBeenCalledTimes(1);
            expect(mockFind.sort).toHaveBeenCalledWith({ dateTime: 1 });
            expect(result).toEqual([mockEvent]);
        });
    });
    describe('findEventById', () => {
        it('deve retornar um evento pelo ID', async () => {
            const mockFindById = {
                lean: jest.fn().mockResolvedValue(mockEvent),
            };
            Event_1.default.findById.mockReturnValue(mockFindById);
            const result = await eventService.findEventById(mockEvent._id);
            expect(Event_1.default.findById).toHaveBeenCalledWith(mockEvent._id);
            expect(result).toEqual(mockEvent);
        });
        it('deve retornar null quando evento não existe', async () => {
            const mockFindById = {
                lean: jest.fn().mockResolvedValue(null),
            };
            Event_1.default.findById.mockReturnValue(mockFindById);
            const result = await eventService.findEventById('id-inexistente');
            expect(result).toBeNull();
        });
    });
    describe('deleteEvent', () => {
        it('deve deletar e retornar o evento removido', async () => {
            const mockFindByIdAndDelete = {
                lean: jest.fn().mockResolvedValue(mockEvent),
            };
            Event_1.default.findByIdAndDelete.mockReturnValue(mockFindByIdAndDelete);
            const result = await eventService.deleteEvent(mockEvent._id);
            expect(Event_1.default.findByIdAndDelete).toHaveBeenCalledWith(mockEvent._id);
            expect(result).toEqual(mockEvent);
        });
    });
});
