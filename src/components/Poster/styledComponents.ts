import Image from 'next/image';
import styled from 'styled-components';

export const PosterContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:before {
    z-index: 10;
    content: '';
    display: block;
    position: absolute;
    height: 0%;
    width: 100%;
    bottom: 0;
    transition: height 350ms ease-out;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }

  &:hover:before {
    height: 100%;
  }

  &:after {
    position: absolute;
    z-index: 11;
    bottom: -1vw;
    opacity: 0;
    left: 1vw;
    color: #fff;
    font-style: italic;
    font-weight: 100;
    content: '${(props) => props.title}';
  }

  &:hover:after {
    bottom: 1vw;
    opacity: 1;
    transition: 500ms ease-out;
  }
`;

export const PosterImage = styled(Image)``;
