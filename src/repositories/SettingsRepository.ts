import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> {}