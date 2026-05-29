import 'dotenv/config';
import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT ?? 3001;

const start = async (): Promise<void> => {
  await connectDB();
  console.log('Conectado ao MongoDB.');

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}.`);
  });
};

start().catch((err: unknown) => {
  console.error('Falha ao iniciar o servidor:', err);
  process.exit(1);
});
