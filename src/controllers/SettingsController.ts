import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { SettingsService } from '../services/SettingsService';

export class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    try {
      const settingsService = new SettingsService();

      const settings = await settingsService.create({ chat, username });
      
      return response.json(settings);
    } catch (error) {
      return response.status(400).json({
        message: error.message
      });
    }

  }
}