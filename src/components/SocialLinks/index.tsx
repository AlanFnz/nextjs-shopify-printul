import React from 'react';
import { SocialLinksContainer, SocialLinksList } from './styledComponents';
import { links } from './links';

const SocialLinks = () => {
  return (
    <SocialLinksContainer>
      <SocialLinksList>
        {links?.map((link, index) => {
          return (
            <li key={index}>
              <a href={link.url} target="_blank" rel={'noreferrer'}>
                <svg
                  style={{ width: 18, height: 24, margin: '0 0.5em' }}
                  xmlns={link.svg?.xmlns}
                  viewBox={link.svg?.viewBox}
                >
                  <path fill={link.svg?.fill} d={link.svg?.d} />
                </svg>
              </a>
            </li>
          );
        })}
      </SocialLinksList>
    </SocialLinksContainer>
  );
};

export default SocialLinks;
