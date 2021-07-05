import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import { Container, Header } from '@pages/Channel/styles';
import React, { useCallback } from 'react';
import ChatList from '@components/ChatList/index';
import useSWR from 'swr';
import { IDM } from '@typings/db';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: chatData } = useSWR<IDM[]>(`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat('');
  }, []);

  return (
    // Workspace 태그 안 div 태그는 chilren 이 들어있게 된다
    <Container>
      <Header>채널!</Header>
      {/* <ChatList chatData={chatData} /> */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
