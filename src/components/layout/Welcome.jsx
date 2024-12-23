/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { myStyle } from '../../utils/style';
import Profile from './profile';

function Welcome({ themeIsDark }) {
  return (
    <section id='home'>
      <motion.div
        className='flex pt-10 flex-col items-center justify-center'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className='text-sm lg:text-base'>Hello, je suis</p>
        <h1 className='font-medium text-2xl lg:text-3xl'>Josia Yvan</h1>
        <p className='text-gray-400 mt-1 text-xs'>Ingenieur informatique</p>

        <motion.div
          className='flex space-x-6 my-10'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: -1 }}
        >
          <button
            className='rounded-lg border border-yellow-500 text-yellow-500 px-4 lg:px-6 py-2 lg:py-3
             shadow hover:shadow-inner
             hover:shadow-yellow-700 active:shadow-inner
             transition-all duration-600'
          >
            <a href='documents/cv.pdf' download='CV de Josia Y. Ingenieur informatique.pdf'>
              Télécharger mon CV
            </a>
          </button>

          <button
            className='rounded-lg px-4 lg:px-6 py-2 lg:py-3 bg-yellow-500 hover:bg-yellow-600'
            style={{ color: !themeIsDark ? myStyle.white : myStyle.bg }}
          >
            <Link to='#about'>
              A propos de moi
            </Link>
          </button>
        </motion.div>
      </motion.div>

      <Profile themeIsDark={themeIsDark} />
    </section>
  );
}

export default Welcome;
