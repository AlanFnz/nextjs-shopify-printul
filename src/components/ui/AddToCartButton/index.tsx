import { Icons } from '@/components/icons';
import useStore from '@/state/slices/shopifySlice';
import React from 'react';

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  const isLoading = useStore((state) => state.loading);

  return (
    <div
      className='flex items-center relative cursor-pointer h-10 w-12 rounded-md text-center bg-white text-black p-2.5'
      onClick={onClick}
    >
      {isLoading ? (
        <Icons.spinner
          style={{ marginLeft: '0.4em' }}
          className='h-4 w-4 animate-spin'
          aria-hidden='true'
        />
      ) : (
        <>
          <p>+</p>
          <Icons.cart className='h-4 w-4' aria-hidden='true' />
        </>
      )}
    </div>
  );
};

export default AddToCartButton;
