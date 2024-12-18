import React from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/16/solid';
import { myStyle } from '../../utils/style';

export function ScrollIndicator({ themeIsDark }) {
  return (
    <div className='absolute -right-6 lg:right-20 bottom-12 lg:-top-20 rotate-90 flex space-x-2 items-center'>
      <p className='text-yellow-500 text-xs' style={{ color: !themeIsDark && myStyle.brown }}>Scroll Down</p>
      <ChevronDoubleRightIcon className='text-yellow-500 w-4' style={{ color: !themeIsDark && myStyle.brown }} />
    </div>
  );
}
