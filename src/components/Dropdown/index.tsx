import React, { useReducer, useState } from 'react';
import {
  DropdownContainer,
  InputPlaceholder,
  OptionsContainer,
  Option,
} from './styledComponents';

const Dropdown = (props: any) => {
  const [dropdownState, setDropdownState] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    {
      isOpen: false,
      selectedOptionTitle: '',
      selectedOptionId: '',
    }
  );

  const onSelectOption = (option: any) => {
    setDropdownState({
      isOpen: false,
      selectedOptionTitle: option.title,
      selectedOptionId: option.id,
    });
  };

  return (
    <DropdownContainer
      isOpen={dropdownState.isOpen}
      onClick={() => setDropdownState({ isOpen: !dropdownState.isOpen })}
    >
        <OptionsContainer isOpen={dropdownState.isOpen}>
          {dropdownState.isOpen && props.options &&
            props.options.map((option: any) => {
              return (
                <Option
                  onClick={() => onSelectOption(option)}
                  key={option.id}
                >
                  {option.title}
                </Option>
              );
            })}
        </OptionsContainer>
      <InputPlaceholder
        type='text'
        readOnly
        placeholder={
          dropdownState.selectedOptionTitle
            ? dropdownState.selectedOptionTitle
            : 'Select variant'
        }
      />
    </DropdownContainer>
  );
};

export default Dropdown;
