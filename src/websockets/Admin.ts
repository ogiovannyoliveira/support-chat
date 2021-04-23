import { Socket } from "socket.io";
import { WS } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";

WS.on('connect', async (socket: Socket) => {
  const connectionsService = new ConnectionsService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  WS.emit('admin_list_all_users', allConnectionsWithoutAdmin);
})