import React, { useCallback, FC } from 'react';
import {
  Header,
  ProfileImg,
  RightMenu,
  Workspaces,
  WorkspaceWrapper,
  Channels,
  WorkspaceName,
  Chats,
  MenuScroll,
} from '@layouts/Workspace/styles';
import fetcher from '@utils/fetcher';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
// swr 에도 mutete 가 있는데 범용적으로 사용할수가 있다
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import Menu from '@components/Menu';

// children을 쓰는 컴포넌트의 경우에는 FC
// children을 안쓰는 컴포넌트의 경우에는 VFC

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);
  const [showUserMenu,setShowUserMenu] = const [state, setstate] = useState(initialState)(false)
  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        // revalidate();
        mutate(false, false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);
  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt={data.nickname} />
            {showUserMenu && <Menu style={{ right: 0,top: 38}} onCloseModal={onClickUserProfile}>프로필 메뉴</Menu>}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>Menu scroll</MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  );
};

export default Workspace;
