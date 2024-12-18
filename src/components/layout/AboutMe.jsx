/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import { BulbOutlined, CommentOutlined, HourglassOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function AboutMe({ themeIsDark }) {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id='about'>
      <div id='about' className='mt-20 lg:mt-36'>
        <div className='flex flex-col items-center'>
          <p className='text-gray-400 text-xs'>Présentation</p>
          <h1 className='font-medium text-2xl text-yellow-500'>A propos de moi</h1>
        </div>
        <div className=' mt-5 xl:mt-20 rounded-lg'>
          <div className='flex flex-col lg:flex-row p-4'>
            <img
              src='/images/identity.png'
              alt='Profile'
              className='w-[320px] h-[420px] rounded-3xl mx-auto lg:mr-4 lg:mt-10 filter grayscale brightness-75'
            />
            <div className='flex flex-col lg:ml-20 mt-8'>
              <div>
                <div className='flex justify-around mx-auto w-[450px] lg:w-[500px]'>
                  <div className='flex flex-col items-center w-40 h-26 lg:h-32 font-semibold lg:text-base text-sm lg:py-4 py-3 mx-1 shadow-md lg:rounded-2xl rounded-xl' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
                    <BulbOutlined className='mt-2 text-yellow-500 lg:text-2xl text-xl' />
                    <p className='mt-2 text-center'>Créative</p>
                  </div>
                  <div className='flex flex-col items-center w-40 h-26 lg:h-32 font-semibold lg:text-base text-sm lg:py-4 py-3 mx-1 shadow-md lg:rounded-2xl rounded-xl' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
                    <CommentOutlined className='mt-2 text-yellow-500 lg:text-2xl text-xl' />
                    <p className='mt-2 text-center'>Capacité d'adaptation</p>
                  </div>
                  <div className='flex flex-col items-center w-40 h-26 lg:h-32 font-semibold lg:text-base text-sm lg:py-4 py-3 mx-1 shadow-md lg:rounded-2xl rounded-xl' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
                    <HourglassOutlined className='mt-2 text-yellow-500 lg:text-2xl text-xl' />
                    <p className='mt-2 text-center'>Autonome</p>
                  </div>
                </div>
                <p className='mt-8 lg:mx-2 mx-20 text-sm lg:text-base lg:text-left text-center' style={{ lineHeight: 1.7 }}>
                  A 26 ans, je suis actuellement en reconversion pour travailler dans le milieu du développement web.
                  <br />
                  Suite à un bac +2 développeur web à la Digital School de Brest, j’ai pu acquérir les bases de plusieurs langages web (HTML, CSS, Javascript, PHP), la gestion de bases de données mais aussi l’utilisation de logiciels tels que Illustrator, Blender ou Figma que j’utilise régulièrement pour créer des maquettes interactives.
                  <br />
                  J’ai ensuite pu exercer et améliorer ces connaissances avec un stage de 3 mois aux côtés d’un développeur web expérimenté.
                  <br />
                  J’aimerais maintenant continuer ma formation avec une troisième année en bachelor « Développement web » en alternance toujours à la Digital School.
                </p>
              </div>
              <div className='mt-8 mx-auto lg:ml-2'>
                <button
                  className='transition duration-500 bg-yellow-500 py-3 px-4 rounded-lg hover:bg-yellow-400 hover:shadow-[0_0px_10px_rgba(227,178,0,0.5)]'
                  style={{
                    color: themeIsDark ? myStyle.bg : myStyle.white
                  }}
                  onClick={() => handleScroll('contact')}
                >
                  <a href='#contact'>Contactez moi</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
