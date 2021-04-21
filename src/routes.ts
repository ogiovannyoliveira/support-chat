import { Router } from 'express';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const ROUTER = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();

ROUTER.post('/settings', settingsController.create);
// 
ROUTER.post('/users', usersController.create);

export { ROUTER };
