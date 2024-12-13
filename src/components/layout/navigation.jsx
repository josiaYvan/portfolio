/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import {
  BlockOutlined, MenuOutlined, BellOutlined
} from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar, Button, Badge, Drawer
} from 'antd';
import { getSessionUser } from '../../utils/authentication';
import { formatDateInFrench } from '../../utils/format';
import { extractNameFromMail, userLogout } from '../../utils/funtcion';
import { useSocketContext } from '../../context/SocketContext';

function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { newNotifCount } = useSocketContext();

  const routes = [
    { label: 'A_propos', route: 'about' },
    { label: 'Service', route: 'solution' },
    { label: 'Prix', route: 'pricing' },
    { label: 'Temoignage', route: 'temoignage' },
    { label: 'Communauté', route: 'community' }
  ];

  const user = getSessionUser();

  return (
    <section className='bg-white'>
      <nav className='flex justify-between sm:mt-0 md:p-6 px-4'>
        <div className='flex justify-between items-center w-full'>
          <div className='xl:w-1/3'>
            <a className='block max-w-max' href='#'>
              <img className='h-8' src='/logo.ico' alt='Logo' />
            </a>
          </div>
          <div className='hidden xl:block xl:w-1/3'>
            <ul className='flex justify-center'>
              {routes.map((item, index) => (
                <li className='mr-12' key={index}>
                  <a className='text-coolGray-500 hover:text-orange-500 font-medium' href={`#${item.route}`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='hidden xl:block xl:w-1/3'>
            <div className='flex items-center justify-end'>
              {user ? (
                <>
                  <Link to='/main/courrier'>
                    <Badge count={newNotifCount} size='small'>
                      <BellOutlined />
                    </Badge>
                  </Link>
                  <div
                    className='relative inline-block py-2 px-4 text-orange-500 font-medium rounded-lg'
                    onMouseEnter={() => setIsCardVisible(true)}
                    onMouseLeave={() => setIsCardVisible(false)}
                  >
                    <span className='cursor-pointer p-4 shadow-sm rounded-lg'>
                      Bonjour,
                      {' '}
                      {user.firstname ? user.firstname : extractNameFromMail(user.email)}
                    </span>
                    {isCardVisible && (
                      <div className='absolute top-full right-0 w-72 bg-white shadow-lg rounded-lg border p-4'>
                        <div className='flex flex-col items-center'>
                          <Avatar size={100} src={user.avatar} className='my-4' />
                          <h2 className='text-xl font-bold'>{user.name ? user.name : '--'}</h2>
                          <p className='text-gray-400 mb-4'>{user.firstname ? user.firstname : '--'}</p>
                          <p className='text-gray-400 mb-4'>{user.email ? user.email : '--'}</p>
                          <Link to='/main/client'>
                            <button className='inline-block py-2 px-2 w-full text-sm leading-4 text-orange-50 bg-orange-500 hover:bg-orange-600 rounded-lg'>
                              <BlockOutlined />
                              {' '}
                              Accéder à l&#39;espace client
                            </button>
                          </Link>
                          <p className='text-sm text-gray-400 mt-4'>
                            Membre depuis:
                            {' '}
                            {formatDateInFrench(user.createdAt)}
                          </p>
                          <Button onClick={userLogout} type='dashed' className='mt-2 text-orange-500'>
                            Se deconnecter
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a className='py-2 px-4 mr-2 text-orange-500' href='/auth/login'>Log In</a>
                  <a className='py-2 px-4 text-white bg-orange-500 rounded-lg' href='/auth/signup'>Sign Up</a>
                </>
              )}
            </div>
          </div>
        </div>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className='xl:hidden border px-2 rounded hover:text-orange-500 hover:shadow'>
          <MenuOutlined />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        title={<img className='pt-2 h-8' src='/logo.ico' alt='Logo' />}
        placement='left'
        width={250}
        closeIcon={null}
        onClose={() => setMobileNavOpen(false)}
        open={mobileNavOpen}
        className='font-semibold'
      >
        <ul className=''>
          {routes.map((item, index) => (
            <a className='text-coolGray-500' href={`#${item.route}`} key={index}>
              <li className='py-3 hover:text-orange-500 hover:bg-gray-200 pl-3 rounded-lg'>
                {item.label}
              </li>
            </a>
          ))}
        </ul>
        <div className='mt-12'>
          {user ? (
            <div className='text-center'>
              <span className='block py-2 text-gray-400'>
                Bonjour,
                {' '}
                {user.firstname ? user.firstname : extractNameFromMail(user.email)}
              </span>
              <Link to='/main/client'>
                <button className='inline-block py-2 px-2 w-full text-sm leading-4 text-orange-50 bg-orange-500 hover:bg-orange-600 rounded-lg'>
                  <BlockOutlined />
                  {' '}
                  Accéder à l&#39;espace client
                </button>
              </Link>
            </div>
          ) : (
            <>
              <a className='block py-2 text-orange-500' href='/auth/login'>Log In</a>
              <a className='block py-2 mt-2 text-white bg-orange-500 text-center rounded-lg' href='/auth/signup'>Sign Up</a>
            </>
          )}
        </div>
      </Drawer>
    </section>
  );
}

export default Navbar;
