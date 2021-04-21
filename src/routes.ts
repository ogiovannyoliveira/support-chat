import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const ROUTER = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

ROUTER.post('/settings', settingsController.create);
// 
ROUTER.post('/users', usersController.create);
//
ROUTER.post('/messages', messagesController.create);
ROUTER.get('/messages/user/:user_id', messagesController.showByUser);

export { ROUTER };
