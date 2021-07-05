import React from 'react';
// typescript 에 같이 설치 npm i -D @types/loadable__component
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

// 코드 스플리팅
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  // Switch 세개중에서 반드시 한개는 된다
  //
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/:workspace" component={Workspace} />
    </Switch>
  );
};

export default App;
