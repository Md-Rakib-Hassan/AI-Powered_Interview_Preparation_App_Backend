import express, { Request, Response } from 'express';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import cors from 'cors';

const app = express();
app.use(express.json());

// fix CORS properly
app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Server is running',
  });
});

app.use(notFound);

export default app;
