import React, { useReducer } from 'react';
import {
  DropdownContainer,
  InputPlaceholder,
  OptionsContainer,
  Option,
} from './styledComponents';
import { outsideDismiss } from '@/lib/utils';

interface DropdownOption {
  id: string;
  title: string;
}

interface DropdownProps {
  options: DropdownOption[];
}

interface DropdownState {
  isOpen: boolean;
  selectedOptionTitle: string;
  selectedOptionId: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [dropdownState, setDropdownState] = useReducer(
    (prev: DropdownState, next: Partial<DropdownState>) => ({ ...prev, ...next }),
    {
      isOpen: false,
      selectedOptionTitle: '',
      selectedOptionId: '',
    }
  );

  const handleDropdownClick = () => {
    setDropdownState({ isOpen: !dropdownState.isOpen });
  };

  const handleOptionClick = (option: DropdownOption) => {
    setDropdownState({
      isOpen: false,
      selectedOptionTitle: option.title,
      selectedOptionId: option.id,
    });
  };

  return (
    <DropdownContainer
      isOpen={dropdownState.isOpen}
      onClick={handleDropdownClick}
      onBlur={(e) => outsideDismiss(e, setDropdownState)}
      role="combobox"
      aria-expanded={dropdownState.isOpen}
      aria-haspopup="listbox"
    >
      <OptionsContainer isOpen={dropdownState.isOpen} role="listbox">
        {dropdownState.isOpen &&
          options &&
          options.map((option) => (
            <Option
              onClick={() => handleOptionClick(option)}
              key={option.id}
              role="option"
            >
              {option.title}
            </Option>
          ))}
      </OptionsContainer>
      <InputPlaceholder
        type="text"
        readOnly
        placeholder={
          dropdownState.selectedOptionTitle || 'Select variant'
        }
        aria-readonly="true"
      />
    </DropdownContainer>
  );
};

export default Dropdown;
