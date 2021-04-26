import { Socket } from "socket.io";
import { WS } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { MessagesService } from "../services/MessagesService";

WS.on('connect', async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  WS.emit('admin_list_all_users', allConnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);
  })

  socket.on('admin_send_message', async params => {
    const { user_id, text } = params;

    await messagesService.create({
      text,
      user_id,
      admin_id: socket.id
    });

    const { socket_id } = await connectionsService.findByUserID(user_id);

    WS.to(socket_id).emit('admin_send_to_client', {
      text,
      socket_id: socket.id
    });
  })

  socket.on('admin_user_in_support', async params => {
    const { user_id } = params;

    await connectionsService.updateAdminID(user_id, socket.id);

    WS.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  })
})