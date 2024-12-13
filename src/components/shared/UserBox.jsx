/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../assets/images/avatar.png';
import { getSessionUser } from '../../utils/authentication';

function UserBox() {
  const user = getSessionUser();
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='logo-box py-10 px-6 '
      onClick={() => navigate('/main/profile')}
    >
      <img
        className='w-[50px] h-auto rounded-full'
        src={user?.avatar || Avatar}
        crossOrigin='anonymous'
        alt='avatar-img'
      />
      <h2 className='user-name'>
        {user?.firstname}
      </h2>
    </div>
  );
}

export default UserBox;
