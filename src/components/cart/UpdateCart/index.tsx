'use client';

import * as React from 'react';
import type { CartLineItem } from '@/types';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/icons';

interface UpdateCartProps {
  cartLineItem: CartLineItem;
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className='flex items-center space-x-1'>
      <div className='flex items-center space-x-1'>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          onClick={() => console.log('implement me :))))')}
          disabled={isPending}
        >
          <Icons.remove className='h-3 w-3' aria-hidden='true' />
          <span className='sr-only'>Remove one item</span>
        </Button>
        <Input
          type='number'
          min='0'
          className='h-8 w-14'
          value={cartLineItem.quantity}
          onChange={() => console.log('implement me!')}
          disabled={isPending}
        />
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8'
          onClick={() => console.log('implement me!')}
          disabled={isPending}
        >
          <Icons.add className='h-3 w-3' aria-hidden='true' />
          <span className='sr-only'>Add one item</span>
        </Button>
      </div>
      <Button
        variant='outline'
        size='icon'
        className='h-8 w-8'
        onClick={() => console.log('me too please')}
        disabled={isPending}
      >
        <Icons.trash className='h-3 w-3' aria-hidden='true' />
        <span className='sr-only'>Delete item</span>
      </Button>
    </div>
  );
}
