import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ROUTER } from './routes'
import './database';

const APP = express();

const APP_PORT = process.env.APP_PORT || 3333;

const HTTP = createServer(APP);
const WS = new Server(HTTP);

WS.on('connection', (socket: Socket) => {
  console.log('Connected: ', socket.id);
})

APP.use(express.json());

APP.use(ROUTER);

HTTP.listen(APP_PORT, () => {
  console.log('Server already to launch on port %s! 🚀', APP_PORT);
});