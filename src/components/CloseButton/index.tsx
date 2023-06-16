import React from 'react';
import { Wrapper, Circle, Line } from './styledComponents';

interface CloseButton {
  isModal: boolean;
  closeAction: () => void;
}

const CloseButton = (props: CloseButton) => {
  const { isModal, closeAction } = props;
  return (
    <Wrapper isModal={props.isModal} onClick={closeAction}>
      <Circle>
        <Line />
        <Line />
      </Circle>
    </Wrapper>
  );
};

export default CloseButton;
