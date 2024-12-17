/* eslint-disable react/button-has-type */
import { LinkedinFilled } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { myStyle } from '../../utils/style';

function LinkedIn({ themeIsDark }) {
  return (
    <Link to='https://www.linkedin.com/in/josia-yvan/' target='_blank'>
      <div className='absolute left-80 -bottom-20'>
        <button className='flex justify-center items-center w-10 h-10 rounded shadow-md backdrop-blur-md' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
          <LinkedinFilled className='text-yellow-500' style={{ color: !themeIsDark && myStyle.brown }} />
          <div className='absolute top-14 w-[2px] h-16 rounded bg-yellow-500' style={{ backgroundColor: !themeIsDark && myStyle.brown }} />
        </button>
      </div>
    </Link>
  );
}

export default LinkedIn;
