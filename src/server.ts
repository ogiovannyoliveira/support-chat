import { HTTP } from './http';
import './websockets/Client';
import './websockets/Admin';

const APP_PORT = process.env.APP_PORT || 3333;

HTTP.listen(APP_PORT, () => {
  console.log('Server already to launch on port %s! 🚀', APP_PORT);
});