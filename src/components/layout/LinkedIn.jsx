/* eslint-disable react/button-has-type */
import { LinkedinFilled } from '@ant-design/icons';
import React from 'react';

function LinkedIn() {
  return (
    <div className='absolute left-80 -bottom-20'>
      <button className='flex justify-center items-center w-10 h-10 rounded backdrop-blur-md bg-yellow-900'>
        <LinkedinFilled className='text-yellow-500' />
        <div className='absolute top-14 w-[2px] h-16 rounded bg-yellow-500' />
      </button>
    </div>
  );
}

export default LinkedIn;
