import React from 'react';

import { Wrapper, Circle, Line } from './close-button.styled';

interface CloseButton {
  isModal: boolean;
  closeAction: () => void;
}

export const CloseButton = (props: CloseButton) => {
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
