import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUsersCreate {
  email: string
}

export class UsersService {
  async create({ email }: IUsersCreate) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.findOne({ email });

    if (userExists) return userExists;

    const users = usersRepository.create({ email });

    await usersRepository.save(users);

    return users;
  }
}