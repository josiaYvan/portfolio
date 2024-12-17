import {
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/16/solid';
import React from 'react';
import { myStyle } from '../../utils/style';

function Menu({ activeSection }) {
  return (
    <div className='z-20 fixed bottom-8 left-1/2 transform -translate-x-1/2 w-80'>
      <div
        className='p-4 rounded-full flex justify-around items-center backdrop-blur-md shadow-lg'
        style={{ backgroundColor: myStyle.yellowDark }}
      >
        <a href='#home'>
          <HomeIcon
            className={`w-6 h-6 ${
              activeSection === 'home' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </a>
        <a href='#about'>
          <UserIcon
            className={`w-6 h-6 ${
              activeSection === 'about' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </a>
        <a href='#skills'>
          <BookOpenIcon
            className={`w-6 h-6 ${
              activeSection === 'skills' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </a>
        <a href='#projects'>
          <BriefcaseIcon
            className={`w-6 h-6 ${
              activeSection === 'projects' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </a>
        <a href='#contact'>
          <ChatBubbleBottomCenterTextIcon
            className={`w-6 h-6 ${
              activeSection === 'contact' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </a>
      </div>
    </div>
  );
}

export default Menu;
