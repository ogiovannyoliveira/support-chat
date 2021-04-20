import express from 'express';
import { ROUTER } from './routes'
import './database';

const APP = express();

const APP_PORT = process.env.APP_PORT || 3333;

APP.use(express.json());

APP.use(ROUTER);

APP.listen(APP_PORT, () => {
  console.log('Server already to launch on port %s! 🚀', APP_PORT);
});