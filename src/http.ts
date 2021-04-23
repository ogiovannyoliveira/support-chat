import express, { response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ROUTER } from './routes'
import { join } from 'path';
import './database';

const APP = express();

APP.use(express.static(join(__dirname, '..', 'public')));
APP.set('views', join(__dirname, '..', 'public'));
APP.engine('html', require('ejs').renderFile);
APP.set('view engine', 'html');

APP.get('/pages/client', (request, response) => {
  return response.render('html/client.html');
})
APP.get('/pages/admin', (request, response) => {
  return response.render('html/admin.html');
})

const HTTP = createServer(APP);
const WS = new Server(HTTP);

WS.on('connection', (socket: Socket) => {
  console.log('Connected: ', socket.id);
})

APP.use(express.json());
APP.use(ROUTER);

export { HTTP, WS };