import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './layouts/App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
);

// pages -- service page
// components --  짜잘 컴포넌트
// layouts  -- 공통 레이아웃
