import type { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  // Erros de validação do Mongoose
  if (err instanceof MongooseError.ValidationError) {
    res.status(400).json({
      message: 'Erro de validação.',
      errors: Object.values(err.errors).map((e) => e.message),
    });
    return;
  }

  // Erros de Cast (ex: ID inválido)
  if (err instanceof MongooseError.CastError) {
    res.status(400).json({ message: 'ID inválido.' });
    return;
  }

  const statusCode = err.statusCode ?? 500;
  const message = err.message || 'Erro interno do servidor.';

  res.status(statusCode).json({ message });
};

export default errorHandler;
