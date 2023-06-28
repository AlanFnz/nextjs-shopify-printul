// Modal.tsx

import React, { ReactNode } from 'react';
import CloseButton from '../../ui/CloseButton';
import { ModalBox, ModalOverlay } from './Moda.styles';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  closeAction: () => void;
}

const Modal = ({ isOpen, closeAction, children }: ModalProps) => {
  return isOpen ? (
    <ModalOverlay onClick={closeAction}>
      <ModalBox
        role='dialog'
        aria-modal='true'
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton isModal={true} closeAction={closeAction} />
        {children}
      </ModalBox>
    </ModalOverlay>
  ) : null;
};

export default Modal;
