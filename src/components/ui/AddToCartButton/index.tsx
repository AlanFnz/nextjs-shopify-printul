import React from 'react';

const AddToCartButton = (props: any) => {
  return (
    <div className='relative cursor-pointer mt-8 w-24 h-10 right-5 rounded-md text-center bg-white text-black p-2.5'>
      <p className='text-sm'>Add to cart</p>
    </div>
  );
};

export default AddToCartButton;
