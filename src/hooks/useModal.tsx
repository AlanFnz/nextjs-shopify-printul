import { useState, Dispatch, SetStateAction } from 'react';

interface UseModalReturn {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggle: () => void;
  closeModal: () => void;
}

export default function useModal(): UseModalReturn {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    toggle,
    closeModal,
  };
}
