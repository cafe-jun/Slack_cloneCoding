import React from 'react';
import Workspace from '@layouts/Workspace';

const Channel = () => {
  return (
    // Workspace 태그 안 div 태그는 chilren 이 들어있게 된다
    <Workspace>
      <div>로그인 하신것을 축하드려요 </div>
    </Workspace>
  );
};

export default Channel;
