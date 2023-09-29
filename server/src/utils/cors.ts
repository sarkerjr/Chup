import cors from 'cors';

export default function () {
  const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  return cors(corsOptions);
}
