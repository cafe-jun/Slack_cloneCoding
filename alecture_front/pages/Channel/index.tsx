import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import { Container, Header } from '@pages/Channel/styles';
import React, { useCallback } from 'react';
import ChatList from '@components/ChatList/index';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log('submit');
    setChat('');
  }, []);
  return (
    // Workspace 태그 안 div 태그는 chilren 이 들어있게 된다
    <Container>
      <Header>채널!</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
