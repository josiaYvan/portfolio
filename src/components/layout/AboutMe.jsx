/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { BulbOutlined, CommentOutlined, HourglassOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function AboutMe() {
  return (
    <div className='mt-36'>
      <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-xs'>Présentation</p>
        <h1 className='font-medium text-2xl text-yellow-500'>A propos de moi</h1>
      </div>
      <div className='mt-20 rounded-lg'>
        <div className='flex p-4'>
          <img
            src='/images/identity.png'
            alt='Profile'
            className='w-[300px] h-[400px] rounded-3xl mr-4 mt-10'
          />
          <div className='flex flex-col ml-20'>
            <div>
              <div className='flex justify-around'>
                <div className='flex flex-col items-center w-40 h-32 text-white py-4 mx-1 rounded-2xl' style={{ backgroundColor: myStyle.yellowDark }}>
                  <BulbOutlined className='mt-2 text-yellow-500 text-2xl' />
                  <p className='mt-2 text-center'>Créative</p>
                </div>
                <div className='flex flex-col items-center w-40 h-32 text-white py-4 mx-1 rounded-2xl' style={{ backgroundColor: myStyle.yellowDark }}>
                  <CommentOutlined className='mt-2 text-yellow-500 text-2xl' />
                  <p className='mt-2 text-center'>Capacité d'adaptation</p>
                </div>
                <div className='flex flex-col items-center w-40 h-32 text-white py-4 mx-1 rounded-2xl' style={{ backgroundColor: myStyle.yellowDark }}>
                  <HourglassOutlined className='mt-2 text-yellow-500 text-2xl' />
                  <p className='mt-2 text-center'>Autonome</p>
                </div>
              </div>
              <p className='mt-8 ml-2'>
                À 26 ans, je suis actuellement en reconversion. Suite à un bac +2, j'ai décidé de développer mes compétences en web
                (HTML, CSS, Javascript, PHP). J'ai acquis les bases de plusieurs langages
                et je me sens à l'aise dans l'utilisation de logiciels tels que Illustrator,
                Blender ou Figma que j'utilise régulièrement pour mes projets.
                J’ai ensuite pu exercer et améliorer ces connaissances avec un stage de 3 mois aux côtés d’un développeur web expérimenté.
                J’aimerais maintenant continuer ma formation avec une troisième année en bachelor « Développement web » en alternance toujours à la Digital School.
              </p>
            </div>
            <div className='mt-8 ml-2'>
              <button className='bg-yellow-500 text-gray-800 py-3 px-4 rounded-lg'>
                Contactez moi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
