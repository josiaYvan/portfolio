/* eslint-disable import/no-extraneous-dependencies */
import {
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/16/solid';
import { motion } from 'framer-motion';
import React from 'react';
import { myStyle } from '../../utils/style';

function Menu({ activeSection }) {
  const handleScroll = (id) => {
    if (id === 'home') {
      // Défile vers le haut de la page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Framer-motion animation variants
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 10 },
    tap: { scale: 0.9 }
  };

  return (
    <div className='z-20 fixed bottom-8 left-1/2 transform -translate-x-1/2 w-80'>
      <motion.div
        className='p-4 rounded-full flex justify-around items-center backdrop-blur-md shadow-lg'
        style={{ backgroundColor: myStyle.yellowDark }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => handleScroll('home')}
          variants={iconVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer'
        >
          <HomeIcon
            className={`w-6 h-6 ${
              activeSection === 'home' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </motion.button>
        <motion.button
          onClick={() => handleScroll('about')}
          variants={iconVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer'
        >
          <UserIcon
            className={`w-6 h-6 ${
              activeSection === 'about' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </motion.button>

        <motion.button
          onClick={() => handleScroll('skills')}
          variants={iconVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer'
        >
          <BookOpenIcon
            className={`w-6 h-6 ${
              activeSection === 'skills' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </motion.button>

        <motion.button
          onClick={() => handleScroll('projects')}
          variants={iconVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer'
        >
          <BriefcaseIcon
            className={`w-6 h-6 ${
              activeSection === 'projects' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </motion.button>

        <motion.button
          onClick={() => handleScroll('contact')}
          variants={iconVariants}
          whileHover='hover'
          whileTap='tap'
          initial='initial'
          className='cursor-pointer'
        >
          <ChatBubbleBottomCenterTextIcon
            className={`w-6 h-6 ${
              activeSection === 'contact' ? 'text-yellow-500' : 'text-white'
            }`}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Menu;
