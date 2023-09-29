import { createServer } from 'http';
import { config } from 'dotenv';

import app from './app';

config();

const server = createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
