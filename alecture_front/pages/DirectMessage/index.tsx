import React from 'react';
import Workspace from '@layouts/Workspace';

const DirectMessage = () => {
  return (
    // Workspace 태그 안 div 태그는 chilren 이 들어있게 된다
    <Workspace>
      <div>DM </div>
    </Workspace>
  );
};

export default DirectMessage;
