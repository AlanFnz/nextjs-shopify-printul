import React from 'react';
import { InfoSvg } from '@/constants';
import { ButtonContainer } from './styledComponents';

const PosterInfoButton = (props: any) => {
  return (
    <ButtonContainer>
      <InfoSvg style={{ display: 'flex', width: 24, height: 24, alignItems: 'center' }} />
    </ButtonContainer>
  );
};

export default PosterInfoButton;
