import React, { CSSProperties, FC, useCallback } from 'react';
import { CreateMenu, CloseModalButton } from './styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
  // 나 자신을 클릭했을대는 안닫히는데 부모를 클릭했을때는 닫히는 기능
  // 부모 태그로 이벤트가 버블링이 안된다
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
