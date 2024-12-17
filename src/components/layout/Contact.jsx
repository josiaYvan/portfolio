/* eslint-disable jsx-a11y/label-has-associated-control */
import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { myStyle } from '../../utils/style';

function Contact({ themeIsDark }) {
  console.log('line:5 themeIsDark\n---> ', themeIsDark);
  return (
    <div id='about' className='mt-36'>
      <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-xs'>Get in touch</p>
        <h1 className='font-medium text-2xl text-yellow-500'>Contactez Moi</h1>
      </div>

      <div className='my-20 rounded-lg'>
        <div className='flex flex-col md:flex-row justify-between'>

          {/* Section Contact Email et WhatsApp */}
          <div className='space-y-4'>
            {/* Carte Email */}
            <div className='p-4 rounded-xl shadow-lg w-80 text-center' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
              <div className='text-2xl'>
                <MailOutlined />
              </div>
              <h2 className='mb-2'>Email</h2>
              <Link to='mailto:example@mail.com' target='_blank' className='text-yellow-500 flex justify-center text-xs group'>
                <p>Un mail par ici</p>
                <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                  →
                </span>
              </Link>
            </div>

            {/* Carte WhatsApp */}
            <div className='p-4 rounded-xl shadow-lg w-80 text-center' style={{ backgroundColor: themeIsDark ? myStyle.yellowDark : myStyle.white }}>
              <div className='text-2xl'>
                <WhatsAppOutlined />
              </div>
              <h2 className='mb-2'>Whatsapp</h2>
              <Link to='https://api.whatsapp.com/send?phone=261386183236&text=Hello' target='_blank' className='text-yellow-500 flex justify-center text-xs group'>
                <p>Ou un SMS par là</p>
                <span className='ml-1 group-hover:ml-3 transition-all duration-300 ease-in-out'>
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className='pl-20'>
            <h2 className='text-xl font-bold mb-4'>Un petit message pour en savoir plus ?</h2>

            <form>
              {/* Champ Nom */}
              <div className='mb-4'>
                <label htmlFor='name' className='relative top-3 left-5 px-2 text-xs' style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}>Nom</label>
                <input
                  type='text'
                  id='name'
                  placeholder='Votre nom'
                  className='w-full p-6 rounded-2xl border-2 border-gray-500 text-sm'
                  style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
                />
              </div>

              {/* Champ Email */}
              <div className='mb-4'>
                <label htmlFor='email' className='relative top-3 left-5 px-2 text-xs' style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}>Mail</label>
                <input
                  type='email'
                  id='email'
                  placeholder='Votre mail'
                  className='w-full p-6 rounded-2xl border-2 border-gray-500 text-sm'
                  style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
                />
              </div>

              {/* Champ Message */}
              <div className='mb-6'>
                <label htmlFor='message' className='relative top-3 left-5 px-2 text-xs' style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}>Message</label>
                <textarea
                  id='message'
                  rows='4'
                  placeholder='Votre message'
                  className='w-full p-6 rounded-2xl border-2 border-gray-500 text-sm'
                  style={{ backgroundColor: themeIsDark ? myStyle.bg : myStyle.light }}
                />
              </div>

              {/* Bouton Envoyer */}
              <button
                type='submit'
                className='px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-600  transition'
                style={{ color: (!themeIsDark ? myStyle.white : myStyle.bg) }}
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
