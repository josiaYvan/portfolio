/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Navbar from './navigation';

function HeaderSection() {
  return (
    <section id='about' className='relative bg-white overflow-hidden'>
      <Navbar />
      <div className='py-20 md:py-72 shadow-md'>
        <div className='flex flex-wrap xl:items-center -mx-4 '>
          <div className='w-full md:w-1/2 px-4 mb-16 md:mb-0'>
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-orange-500 uppercase rounded-xl'>A propos</span>
            <h1 className='mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight'>Un service de transport connecté pour les étudiants</h1>
            <p className='mb-8 text-lg md:text-xl text-coolGray-500 font-medium'>Par l’intermédiaire de la numérisation, Bus’nay souhaite digitaliser le transport urbain à Antananarivo .</p>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-auto py-1 md:py-0 md:mr-4'><a className='inline-block py-2 px-4 w-full text-base md:text-lg leading-4 text-orange-50 font-medium text-center bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 border border-orange-500 rounded-xl shadow-sm' href='#'>En savoir plus</a></div>
              {/* <div className='w-full md:w-auto py-1 md:py-0'><a className='inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm' href='#'>Sign Up</a></div> */}
            </div>
          </div>
          <div className='w-full md:w-1/2'>
            <img className='w-9/12 float-right mr-5' src='/images/beep_beep_bus.png' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;
