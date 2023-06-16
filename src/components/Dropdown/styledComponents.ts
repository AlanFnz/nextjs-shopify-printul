import styled from 'styled-components';

interface InputTypes {
  readOnly?: boolean;
  isOpen?: boolean;
}

interface ContainerTypes {
  isOpen?: boolean;
  onClick?: () => void;
}

interface OptionTypes {
  ket?: any;
}

export const DropdownContainer = styled.div<ContainerTypes>`
  position: absolute;
  margin-top: 32px;
  width: 150px;
  height: 40px;

  &:before {
    content: '';
    position: absolute;
    top: 20px;
    right: 22px;
    width: 8px;
    height: 2px;
    background: #555;
    z-index: 10;
    transform: rotate(40deg);
    transition: 350ms;
    ${(props) => props.isOpen && `right: 16px`}
  }

  &:after {
    content: '';
    position: absolute;
    top: 20px;
    right: 16px;
    width: 8px;
    height: 2px;
    background: #555;
    z-index: 10;
    transform: rotate(-40deg);
    transition: 350ms;

    ${(props) => props.isOpen && `right: 22px`}
  }
`;

export const OptionsContainer = styled.div<ContainerTypes>`
  position: absolute;
  bottom: 50px;
  width: 100%;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.05);
  visibility: hidden;
  opacity: 0;
  
  ${(props) => props.isOpen && `visibility: visible; opacity: 1;`}
  
  transition: 200ms;

  div {
    :first-child {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
    :last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

export const Option = styled.div<OptionTypes>`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`

export const InputPlaceholder = styled.input.attrs({
  placeholderTextColor: 'red',
})<InputTypes>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family:inherit;
  cursor: pointer;
  border-radius: 6px;
  padding: 12px 12px;
  font-size: 14px;
  background: #fff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  outline: none;
  border: none

  ::placeholder {
    color: #000;
  }

  ::-webkit-input-placeholder {
    color: #000;
  }

  ::-moz-placeholder {
    color: #000;
  }

  ::-ms-placeholder {
    color: #000;
  }
`;
