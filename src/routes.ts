import { Request, Response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsController } from './controllers/SettingsController';
import { SettingsRepository } from './repositories/SettingsRepository';

const ROUTER = Router();

const settingsController = new SettingsController();

ROUTER.post('/settings', settingsController.create);

export { ROUTER };