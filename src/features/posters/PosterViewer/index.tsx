'use client';

import React, { useState } from 'react';
import useStore from '@/state/slices/shopifySlice';

import Dropdown, { DropdownOption } from '@/components/ui/Dropdown';
import AddToCartButton from '@/components/ui/AddToCartButton';
import PosterInfoButton from '@/features/posters/PosterInfoButton';
import { DialogContent, DialogFooter } from '@/components/ui/Dialog';
import Image from 'next/image';

const IMAGE_SIZE = 600;

interface Image {
  src: string;
}

const PosterViewer = () => {
  const currentPoster = useStore((state) => state.currentPoster);
  const { addToCart } = useStore();
  const cleanCurrentPoster = useStore((state) => state.cleanCurrentPoster);
  const [selectedVariant, setSelectedVariant] = useState<DropdownOption | null>(
    null
  );

  const { title, images } = currentPoster || {
    title: '',
    images: [{ src: '' }],
    variants: [],
  };

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(selectedVariant.id, 1);
    }
  };

  return (
    <DialogContent onClose={cleanCurrentPoster}>
      <div className='relative h-full w-full'>
        <Image
          className='object-contain w-full h-full relative'
          alt={title}
          src={images[0].src}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
        />
      </div>
      <DialogFooter>
        {currentPoster?.variants && (
          <Dropdown
            options={currentPoster.variants}
            selectedOption={selectedVariant}
            onSelectOption={setSelectedVariant}
          />
        )}
        <AddToCartButton onClick={handleAddToCart} />
        <PosterInfoButton />
      </DialogFooter>
    </DialogContent>
  );
};

export default PosterViewer;
