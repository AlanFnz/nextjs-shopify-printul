import { Icons } from '@/components/icons';
import React from 'react';

const AddToCartButton = (props: any) => {
  return (
    <div className='flex items-center relative cursor-pointer mt-8  h-10 rounded-md text-center bg-white text-black p-2.5'>
      +<Icons.cart className='h-4 w-4' aria-hidden='true' />
    </div>
  );
};

export default AddToCartButton;
