/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { myStyle } from '../../utils/style';
import Profile from './profile';

function Welcome({ themeIsDark }) {
  return (
    <section id='home'>
      <div className='flex pt-10 flex-col items-center justify-center'>
        <p className=''>Hello, je suis</p>
        <h1 className='font-medium text-3xl'>Josia Yvan</h1>
        <p className='text-gray-400 mt-1 text-xs'>Ingenieur informatique</p>
        <div className='flex space-x-6 my-10'>
          <button
            className='rounded-lg border border-yellow-500 text-yellow-500 px-6 py-3
             shadow hover:shadow-inner
             hover:shadow-yellow-700 active:shadow-inner
             transition-all duration-600'
          >
            <a href='/documents/cv.pdf' download='CV de Josia Y. Ingenieur informatique.pdf'>
              Télécharger mon CV
            </a>
          </button>

          <Link to='#about'>
            <button
              className='rounded-lg px-6 py-3 bg-yellow-500 hover:bg-yellow-600'
              style={{ color: !themeIsDark ? myStyle.white : myStyle.bg }}
            >
              A propos de moi
            </button>
          </Link>
        </div>
      </div>
      <Profile themeIsDark={themeIsDark} />
    </section>
  );
}

export default Welcome;
