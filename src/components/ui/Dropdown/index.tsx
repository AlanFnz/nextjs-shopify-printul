import React, { useReducer } from 'react';
import { outsideDismiss } from '@/lib/utils';
import {
  dropdownContainerClasses,
  inputPlaceholderClasses,
  optionClasses,
  optionsContainerClasses,
} from './Dropdown.styles';

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
    (prev: DropdownState, next: Partial<DropdownState>) => ({
      ...prev,
      ...next,
    }),
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
    <div
      className={dropdownContainerClasses}
      onClick={handleDropdownClick}
      onBlur={(e) => outsideDismiss(e, setDropdownState)}
      role='combobox'
      aria-expanded={dropdownState.isOpen}
      aria-haspopup='listbox'
    >
      <div
        className={`${optionsContainerClasses} ${
          dropdownState.isOpen ? 'opacity-100 visibility[visible]' : ''
        }`}
        role='listbox'
      >
        {dropdownState.isOpen &&
          options &&
          options.map((option) => (
            <div
              className={optionClasses}
              onClick={() => handleOptionClick(option)}
              key={option.id}
              role='option'
            >
              {option.title}
            </div>
          ))}
      </div>
      <input
        type='text'
        readOnly
        placeholder={dropdownState.selectedOptionTitle || 'Select variant'}
        className={inputPlaceholderClasses}
        aria-readonly='true'
      />
    </div>
  );
};

export default Dropdown;
