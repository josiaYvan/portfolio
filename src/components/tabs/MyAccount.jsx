/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Empty } from 'antd';
import { Link } from 'react-router-dom';
import { getSessionUser } from '../../utils/authentication';
import WalletBox from '../shared/WalletBox';
import TransactionHistory from '../profile/TransactionHistory';

function MyAccount() {
  const user = getSessionUser();

  return (
    <div className=' p-6 xl:p-10'>
      <div className='text-left mb-20'>
        <h1 className='text-3xl md:text-4xl font-bold'>Mon compte</h1>
      </div>

      {!user.wallet ? (
        <Empty
          className='mt-10'
          description={(
            <>
              <span>Oups! Vous ne disposez pas encore de porte-feuille!.</span>
              <div className='mt-5 text-blue-500'>
                <Link to='/main/profile'>Completez votre profil pour l'ouvrir</Link>
              </div>
            </>
          )}
        />
      ) : (
        <>
          {/* Balance Cards Section */}
          <div className='grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-6 mb-6'>
            <WalletBox />
            <div className='flex items-center hover:cursor-pointer p-2 pl-5 sm:p-5 lg:p-8 bg-gray-100 rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-sm'>
              <img src='/vectors/container_x2.svg' className='w-8 sm:w-12 md:w-16 mr-5' alt='wallet' />
              <div className=''>
                <h1 className='font-semibold uppercase text-gray-600 text-[10px] sm:text-[12px] md:text-base'>Ma carte</h1>
                <p className='text-2xl md:text-3xl font-bold text-gray-900'>Bus’nay</p>
              </div>
            </div>
          </div>

          {/* Recharge Button */}
          <div className='text-right mb-6'>
            <Link to='/main/recharge'>
              <button
                type='button'
                className='px-4 md:px-5 py-2 text-[12px] md:text-base rounded-[2rem] bg-orange-500 hover:bg-orange-600 hover:shadow-md font-semibold text-white'
              >
                Recharger mon compte
              </button>
            </Link>
          </div>

          {/* Transaction History */}
          <TransactionHistory />
        </>
      )}
    </div>
  );
}

export default MyAccount;
