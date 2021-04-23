import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  id?: string
  socket_id: string
  user_id: string
  admin_id?: string
}

export class ConnectionsService {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ id, socket_id, user_id, admin_id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      id,
      socket_id,
      user_id,
      admin_id
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserID(user_id: string) {
    const connection = this.connectionsRepository.findOne({ user_id })

    return connection;
  }

  async findAllWithoutAdmin() {
    const connection = this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ['user']
    })

    return connection;
  }
}