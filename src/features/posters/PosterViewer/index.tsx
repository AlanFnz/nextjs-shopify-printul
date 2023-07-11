'use client';

import React from 'react';
import useStore from '@/state/slices/shopifySlice';

import Dropdown from '@/components/ui/Dropdown';
import AddToCartButton from '@/components/ui/AddToCartButton';
import PosterInfoButton from '@/features/posters/PosterInfoButton';
import { DialogContent, DialogFooter } from '@/components/ui/Dialog';
import Image from 'next/image';

interface Image {
  src: string;
}

interface Poster {
  title: string;
  images: Image[];
  id?: string;
  variants?: any[];
}

const PosterViewer = () => {
  const currentPoster = useStore((state) => state.currentPoster);
  const cleanCurrentPoster = useStore((state) => state.cleanCurrentPoster);

  const { title, images } = currentPoster || {
    title: '',
    images: [{ src: '' }],
  };

  return (
    <DialogContent onClose={cleanCurrentPoster}>
      <div className='relative h-full w-full'>
        <Image
          className='object-contain w-full h-full relative'
          alt={title}
          src={images[0].src}
          width={100}
          height={100}
          unoptimized={true}
        />
      </div>
      <DialogFooter>
        {currentPoster?.variants && (
          <Dropdown options={currentPoster.variants} />
        )}
        <PosterInfoButton />
        <AddToCartButton />
      </DialogFooter>
    </DialogContent>
  );
};

export default PosterViewer;
