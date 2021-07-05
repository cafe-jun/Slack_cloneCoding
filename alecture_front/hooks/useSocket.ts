import io from 'socket.io-client';
import { useCallback } from 'react';
import axios from 'axios';

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): [SocketIOClient.Socket | undefined, () => void] => {
  console.log('rerendering', workspace);

  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);
  if (!workspace) {
    return [undefined, disconnect];
  }
  if (!sockets[workspace]) {
    sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
      transports: ['websocket'],
    });
  }
  return [sockets[workspace], disconnect];

  //axios.get(`/api/users`);
  // 롱 폴링이랑 transport 설정 확인
  // sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
  //   transports: ['websocket'],
  // });
  // 서버로 데이터를 보내기
  //  sockets[workspace].emit('hello', 'world');
  // // on으로 서버에서주는 데이터 받기
  // sockets[workspace].on('message', (data) => {
  //   console.log(data);
  // });
  // sockets[workspace].on('data', (data) => {
  //   console.log(data);
  // });
  // 소켓 끊기
  // socket.disconnect()
};

export default useSocket;
