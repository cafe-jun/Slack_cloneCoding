import useInput from '@hooks/useInput';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Form, Success, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);
  //const [email, setEmail] = useState('');
  //const [nickname, setNickname] = useState('');
  const [password, , setPassword] = useInput(''); // 변환을
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  // useCallback 이 많이 생기면 디버깅 하기가 힘들다
  // 리 렌더링이 발생이 되었다고 해서 화면을 다시그리지는 않는다
  // VirtualDom 을 비교하고 있다
  // const onChangeNickname = useCallback((e) => {
  //   setNickname(e.target.value);
  // }, []);
  // const onChangeEmail = useCallback((e) => {
  //   setEmail(e.target.value);
  // }, []);\

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      console.log(e.target.value !== passwordCheck);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  ); // 두번째 배열 인지는 함수 기준으로 외부 변수를 적어주면 된다

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      console.log(e.target.value !== password);

      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email, nickname, password, passwordCheck, mismatchError);
      if (!mismatchError && nickname) {
        console.log('서버로 회원가입을 하기');
        // 비동기 통신하기전 데이터를 초기화 해주어야한다
        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.log(error);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  /**
   * ( 중요 ) hook 는 return 보다 아래에 있어야한다
   */
  if (data) {
    return <Redirect to="/workspace/channel" />;
  }

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
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
