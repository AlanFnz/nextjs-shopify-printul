import React, { useReducer } from 'react';
import { outsideDismiss } from '@/lib/utils';
import {
  dropdownContainerClasses,
  inputPlaceholderClasses,
  optionClasses,
  optionsContainerClasses,
} from './Dropdown.styles';
import { Icons } from '@/components/icons';

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
      onBlur={(e) => outsideDismiss(e, setDropdownState, 100)}
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
      <Icons.filledTriangle
        className={`text-black absolute mt-3 right-4 h-4 w-4 z-10 transition-transform duration-300 ease-in-out transform-origin-center ${
          dropdownState.isOpen ? 'rotate-180' : ''
        }`}
        aria-hidden='true'
      />
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
