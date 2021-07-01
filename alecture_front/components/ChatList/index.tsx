import { ChatZone, Section } from '@components/ChatList/styles';
import { IDM } from '@typings/db';
import React, { VFC } from 'react';

interface Props {
  chatData: IDM[];
}

const ChatList: VFC<Props> = ({ chatData }) => {
  return (
    <ChatZone>
      <Section>section</Section>
    </ChatZone>
  );
};

export default ChatList;
