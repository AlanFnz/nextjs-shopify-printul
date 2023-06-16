import styled from 'styled-components';
import { mobileBreakpoint } from '@/constants';

export const ModalOverlay = styled.div`
  z-index: 9998;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  z-index: 9999;
  position: relative;
  display: block;
  background: rgba(255, 255, 255, 0.1);
  height: 75vh;
  padding: 1rem;
  border-radius: 0.5rem;

  @media only screen and (max-width: ${mobileBreakpoint}) {
    height: unset;
    width: 90vw;
    padding: 0.5rem;
  }
`;
