import { Image } from 'antd';
import React from 'react';

function Community() {
  return (
    <div id='community' className='pb-24 md:pb-24'>
      <div className='flex flex-col mb-10 md:flex-row items-center justify-between p-4 bg-blue-100  rounded-[2rem] shadow-lg'>
        <div className='md:w-1/2'>
          <Image width='100%' src='/images/community.jpeg' alt='Community' className='w-full h-auto rounded-[1.5rem]' />
        </div>
        <div className='md:w-1/2 p-10'>
          <h2 className='text-red-600 text-2xl font-bold'>Rejoindre la communauté des étudiants</h2>
          <p className='mt-2 text-gray-700'>
            Lorem ipsum dolor sit amet consectetur. Dui tristique vehicula amet eros. Ac eu nunc ullamcorper amet. Et.
          </p>
          <input
            type='email'
            placeholder='Mail'
            className='mt-4 p-2 border border-gray-300 rounded-lg w-full'
          />
          <button type='button' className='mt-2 bg-red-600 text-white p-2 rounded-lg w-full'>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Community;
