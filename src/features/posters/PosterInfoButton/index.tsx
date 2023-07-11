import React from 'react';
import { InfoSvg } from '@/constants';

const PosterInfoButton = (props: any) => {
  return (
    <div className="absolute flex justify-center items-center cursor-pointer mt-8 w-10 h-10 right-32 rounded-md text-sm p-2 text-center bg-white">
      <InfoSvg className="flex w-6 h-6 items-center" />
    </div>
  );
};

export default PosterInfoButton;
