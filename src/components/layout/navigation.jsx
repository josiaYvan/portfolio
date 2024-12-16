/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

const { Header } = Layout;

function MyHeader({ themeIsDark, setThemeIsDark }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Header
      style={{ transition: 'ease-in-out 0.3s', backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
      className={`sticky top-0 z-40 h-18 px-72 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className='flex items-center justify-between pt-5 text-yellow-500'>
        <div className='text-lg'>Josia Y.</div>
        <div className='text-lg flex space-x-2'>
          <button onClick={() => setThemeIsDark(!themeIsDark)}>
            {!themeIsDark ? <MoonOutlined /> : <SunOutlined />}
          </button>
        </div>
      </div>
    </Header>
  );
}

export default MyHeader;
