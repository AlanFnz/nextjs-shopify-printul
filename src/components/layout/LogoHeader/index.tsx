"use client"

import React from 'react';
import { LogoContainer, LogoText } from './LogoHeader.styles';

const LogoHeader = () => {
  return (
    <LogoContainer>
      <LogoText href="/" aria-label="Mystery Pulse Home">{'Mystery Skools'}</LogoText>
    </LogoContainer>
  );
};

export default LogoHeader;
