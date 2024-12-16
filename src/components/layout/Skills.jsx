import React from 'react';
import {
  ConsoleSqlOutlined, GithubFilled, GitlabFilled, Html5Filled, PushpinOutlined, WechatWorkOutlined
} from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function Skills() {
  return (
    <div className='mt-36'>
      <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-xs'>Mes softskills</p>
        <h1 className='font-medium text-2xl text-yellow-500'>Mes compétences</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-6 text-white'>
        {/* Section Développement Web */}
        <div className='mt-16 rounded-2xl py-10 px-20' style={{ backgroundColor: myStyle.yellowDark }}>
          <h2 className='text-yellow-500 text-center mb-6'>Développement Web</h2>
          <div className='grid grid-cols-2 gap-6'>
            {/* HTML */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>
                <Html5Filled />
              </span>
              <div>
                <h3 className=''>HTML</h3>
                <p className='text-gray-400 text-xs'>Intermédiaire</p>
              </div>
            </div>
            {/* Wordpress */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>
                <WechatWorkOutlined />
              </span>
              <div>
                <h3 className=''>Wordpress</h3>
                <p className='text-gray-400 text-xs'>Intermédiaire</p>
              </div>
            </div>
            {/* CSS */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>
                <GithubFilled />
              </span>
              <div>
                <h3 className=''>CSS</h3>
                <p className='text-gray-400 text-xs'>Intermédiaire</p>
              </div>
            </div>
            {/* SQL */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>
                <GitlabFilled />
              </span>
              <div>
                <h3 className=''>SQL</h3>
                <p className='text-gray-400 text-xs'>Les bases</p>
              </div>
            </div>
            {/* Javascript */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>
                <ConsoleSqlOutlined />
              </span>
              <div>
                <h3 className=''>Javascript</h3>
                <p className='text-gray-400 text-xs'>Les bases</p>
              </div>
            </div>
            {/* PHP */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>
                <PushpinOutlined />
              </span>
              <div>
                <h3 className=''>PHP</h3>
                <p className='text-gray-400 text-xs'>Les bases</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Web-Design */}
        <div className='mt-16 rounded-2xl py-10 px-20' style={{ backgroundColor: myStyle.yellowDark }}>
          <h2 className='text-yellow-500 text-center mb-6'>Web-Design</h2>
          <div className='grid grid-cols-2 gap-6'>
            {/* Figma */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>🎨</span>
              <div>
                <h3 className=''>Figma</h3>
                <p className='text-gray-400 text-xs'>Avancé</p>
              </div>
            </div>
            {/* Premiere Pro */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>🎞️</span>
              <div>
                <h3 className=''>Premier Pro</h3>
                <p className='text-gray-400 text-xs'>Les bases</p>
              </div>
            </div>
            {/* Illustrator */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>🖌️</span>
              <div>
                <h3 className=''>Illustrator</h3>
                <p className='text-gray-400 text-xs'>Intermédiaire</p>
              </div>
            </div>
            {/* Blender */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>🌀</span>
              <div>
                <h3 className=''>Blender</h3>
                <p className='text-gray-400 text-xs'>Les bases</p>
              </div>
            </div>
            {/* Photoshop */}
            <div className='flex flex-col'>
              <span className='text-xl text-yellow-500'>📷</span>
              <div>
                <h3 className=''>Photoshop</h3>
                <p className='text-gray-400 text-xs'>Intermédiaire</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Skills;
