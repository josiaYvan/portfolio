/* eslint-disable no-restricted-globals */
import React from 'react';
import { Skeleton } from 'antd';
import { ApiOutlined } from '@ant-design/icons';
import { getSessionUser } from '../../utils/authentication';
import useFetchData from '../../hooks/useFetchData';

function WalletBox() {
  const user = getSessionUser();
  const [loading, error, response] = useFetchData(`/get-wallet/${user.id}`);

  function formatMoney(value) {
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) return 'Erreur de conversion';
    return new Intl.NumberFormat('fr-FR').format(numberValue);
  }

  return (
    <div className='flex items-center hover:cursor-pointer p-2 pl-5 sm:p-5 lg:p-8 bg-gray-100 rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-sm'>
      <img src='/vectors/iconwallet_1_x2.svg' className='w-8 sm:w-12 md:w-16 mr-5' alt='wallet' />
      <div className=''>
        <h1 className='font-semibold uppercase text-gray-600 text-[10px] sm:text-[12px] md:text-base'>MON SOLDE</h1>
        <Skeleton loading={loading} active>
          {error ? (
            <div>
              <ApiOutlined />
              <span className='text-gray-400 ml-2'>Vous êtes hors ligne!</span>
            </div>
          ) : (
            <p className='text-2xl md:text-3xl font-bold text-gray-900'>
              {formatMoney(response?.data?.balance)}
              {' '}
              Ar
            </p>
          )}
        </Skeleton>
      </div>
    </div>
  );
}

export default WalletBox;
