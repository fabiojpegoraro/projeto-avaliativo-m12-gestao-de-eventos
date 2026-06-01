import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);

app.use(errorHandler);

export default app;
