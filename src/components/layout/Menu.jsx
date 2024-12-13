import {
  BookOpenIcon, BriefcaseIcon, DocumentIcon, HomeIcon, UserIcon
} from '@heroicons/react/16/solid';
import React from 'react';
import { myStyle } from '../../utils/style';

function Menu() {
  return (
    <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 w-80'>
      <div className='p-4 rounded-full flex justify-around items-center backdrop-blur-md shadow-lg' style={{ backgroundColor: myStyle.yellowDark }}>
        <HomeIcon className='text-white w-6 h-6' />
        <UserIcon className='text-yellow-500 w-8 h-6' />
        <BookOpenIcon className='text-white w-6 h-6' />
        <BriefcaseIcon className='text-white w-6 h-6' />
        <DocumentIcon className='text-white w-6 h-6' />
      </div>
    </div>
  );
}

export default Menu;
