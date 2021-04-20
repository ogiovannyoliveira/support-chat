import express from 'express';
import './database';

const app = express();

const APP_PORT = process.env.APP_PORT || 3333;

app.listen(APP_PORT, () => {
  console.log('Server already to launch on port %s! 🚀', APP_PORT);
})