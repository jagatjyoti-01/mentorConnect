import io from 'socket.io-client';
import { SocketURL } from '../../services/axiosClient';
const sockets = io(SocketURL, { autoConnect: true, forceNew: true });
export default sockets;
