import { Socket } from 'socket.io';
import { WS } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string
  email: string
}

WS.on('connect', (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async (params) => {
    const { text, email } = params as IParams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const user = await usersService.create({ email });

      await connectionsService.create({
        socket_id: socket.id,
        user_id
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connectionAlreadyExists = await connectionsService.findByUserID(userExists.id);

      if (!connectionAlreadyExists) {
        await connectionsService.create({
          socket_id: socket.id,
          user_id
        });
      } else {
        connectionAlreadyExists.socket_id = socket.id;

        await connectionsService.create(connectionAlreadyExists);
      }
    }

    await messagesService.create({ text, user_id });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit('client_list_all_messages', allMessages)

    const allUsers = await connectionsService.findAllWithoutAdmin();

    WS.emit('admin_list_all_users', allUsers);
  })

  socket.on('client_send_to_admin', async params => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionsService.findBySocketID(socket_id);

    const message = await messagesService.create({
      text,
      user_id
    })

    WS.to(socket_admin_id).emit('admin_receive_message', {
      message,
      socket_id
    })
  })
});