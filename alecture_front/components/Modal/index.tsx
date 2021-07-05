import React, { CSSProperties, FC, useCallback } from 'react';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  show: boolean;
  onCloseModal: (e: any) => void;
}

const Modal: FC<Props> = ({ children, show, onCloseModal }) => {
  // 나 자신을 클릭했을대는 안닫히는데 부모를 클릭했을때는 닫히는 기능
  // 부모 태그로 이벤트가 버블링이 안된다
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  if (!show) {
    return null;
  }
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
