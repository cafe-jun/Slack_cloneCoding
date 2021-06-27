import React, { useCallback, FC } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Redirect } from 'react-router';
// children을 쓰는 컴포넌트의 경우에는 FC
// children을 안쓰는 컴포넌트의 경우에는 VFC

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        revalidate();
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
