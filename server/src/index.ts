import { createServer } from 'http';
import { config } from 'dotenv';
import setupSocket from './socket';

import app from './app';

config();

const server = createServer(app);
setupSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
