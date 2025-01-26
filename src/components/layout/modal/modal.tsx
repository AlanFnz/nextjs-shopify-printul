// Modal.tsx

import React, { ReactNode } from 'react';

import { CloseButton } from '@components/ui/close-button';
import { ModalBox, ModalOverlay } from './modal.styled';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  closeAction: () => void;
}

export const Modal = ({ isOpen, closeAction, children }: ModalProps) => {
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
