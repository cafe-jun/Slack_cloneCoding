import useInput from '@hooks/useInput';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';

const LogIn = () => {
  // SWR은 컴포넌트을 호출할때 한번은 반드시 호출한다
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초 동안 서버에는 한번만 호출하고 캐시 된거를 사용한다
  });
  //   아래와 같이 사용될수 있음
  //   const { data } = useSWR('hello', (key) => {
  //   localStorage.setItem('data', key);
  //   return localStorage.getItem('hello');
  // });
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          // revalidate 는 서버로 요청을 보내서 데이터를 다시 가져오는것
          // mutate : 서버에 데이터를 안보내고 수정하는것
          // 두번째 자리에 (shouldRevalidate를 false 로 설정해야함)
          // optimistic ui 서버에 가기도 전에 액션 ui 가 실행된다
          // 먼저 성공을 한다고 생각을 한뒤 이벤트 실행 (passive ui)

          //mutate(response.data, false);
          revalidate();
        })
        .catch((error) => {
          setLogInError(error.response?.data?.statusCode === 401);
        });
    },
    [email, password],
  );

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  /* 
    로그인이 성공하면 redirect 
    로그인이 안되었다면 data 는 false 
  */
  // if (data) {
  //   return <Redirect to="/workspace/sleact/channel/" />;
  // }
  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }
  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Redirect to="/workspace/sleact/channel/일반" />;
  // }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
