'use client';

import React, { useState } from 'react';
import useStore from '@/state/slices/shopifySlice';

import Dropdown, { DropdownOption } from '@/components/ui/Dropdown';
import AddToCartButton from '@/components/ui/AddToCartButton';
import PosterInfoButton from '@/features/posters/PosterInfoButton';
import { DialogContent, DialogFooter } from '@/components/ui/Dialog';
import Image from 'next/image';
import { toast } from 'sonner';

const IMAGE_SIZE = 600;

interface Image {
  src: string;
}

const PosterViewer = () => {
  const currentPoster = useStore((state) => state.currentPoster);
  const { addToCart } = useStore();
  const cleanCurrentPoster = useStore((state) => state.cleanCurrentPoster);

  const [showDescription, setShowDescription] = useState(false);
  const [variantError, setVariantError] = useState(false);
  const [errorAnimationKey, setErrorAnimationKey] = useState(0);

  const [selectedVariant, setSelectedVariant] = useState<DropdownOption | null>(
    null
  );

  const title = currentPoster?.title || '';
  const images = currentPoster?.images || [{ src: '' }];
  const variants = currentPoster?.variants || [];

  const handleAddToCart = async () => {
    if (selectedVariant) {
      await addToCart(selectedVariant.id, 1);
      toast.success('Added successfully');
    } else {
      !variantError && setVariantError(true);
      setErrorAnimationKey((prevKey) => prevKey + 1);
      toast.error('Please select a variant');
    }
  };

  const handleSelectVariant = (option: DropdownOption) => {
    setVariantError(false);
    setSelectedVariant(option);
  };

  const handleClose = () => {
    cleanCurrentPoster();
    setVariantError(false);
    setErrorAnimationKey(0);
    setSelectedVariant(null);
  };

  return (
    <DialogContent onClose={handleClose}>
      <div className='relative h-full w-full'>
        <Image
          className={`object-contain w-full h-full relative ${
            showDescription ? 'blur' : ''
          }`}
          alt={title}
          src={images[0].src}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
        />
        {showDescription && (
          <div className='description-overlay'>
            <p className='description-text'>{currentPoster?.description}</p>
          </div>
        )}
      </div>
      <DialogFooter>
        {currentPoster?.variants && (
          <Dropdown
            key={errorAnimationKey}
            classNames={`${variantError ? 'animate-shake-once' : ''}`}
            options={currentPoster.variants}
            selectedOption={selectedVariant}
            onSelectOption={handleSelectVariant}
          />
        )}
        <AddToCartButton onClick={handleAddToCart} />
        <PosterInfoButton
          onClick={() => setShowDescription(!showDescription)}
        />
      </DialogFooter>
    </DialogContent>
  );
};

export default PosterViewer;
