import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUsersCreate {
  email: string
}

export class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ email }: IUsersCreate) {
    const userExists = await this.findByEmail(email);

    if (userExists) return userExists;

    const users = this.usersRepository.create({ email });

    await this.usersRepository.save(users);

    return users;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }
}