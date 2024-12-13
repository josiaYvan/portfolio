/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import notificationWithIcon from '../../utils/notification';
import { getSessionUser } from '../../utils/authentication';
import { addDaysToDate, getCurrentDateFormatted } from '../../utils/funtcion';
import ApiService from '../../utils/apiService';
import useFetchData from '../../hooks/useFetchData';

function PricingCard({
  id, title, description, tag, price, duration, access
}) {
  const [loading, setLoading] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);
  const user = getSessionUser();
  const navigate = useNavigate();
  const [getLoading, getError, getResponse] = useFetchData(user ? `/subscription/by-user-email/${user.id}` : null, fetchAgain);

  const subscribe = async () => {
    if (!user) {
      navigate('/auth/login');
      notificationWithIcon('info', 'INFO', 'Veuilez vous connecter pour continuer!');
    } else {
      const data = {
        user: user.id,
        offer: id,
        subscriptionDate: getCurrentDateFormatted(),
        expiredSubscriptionDate: addDaysToDate(duration)
      };
      try {
        setLoading(true);
        setFetchAgain(true);
        const response = await ApiService.post('/create-subscription', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (response?.result_code === 0) {
          notificationWithIcon('success', 'SUCCESS', 'Abonnement réussie!');
          setFetchAgain(false);
          setLoading(false);
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
          setFetchAgain(false);
          setLoading(false);
        }
      } catch (error) {
        notificationWithIcon('error', 'ERROR', error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
        setLoading(false);
      }
    }
  };

  // Vérifie si l'utilisateur est déjà abonné à cette offre
  const isSubscribed = () => {
    if (getResponse?.data?.rows) {
      return getResponse.data.rows.some((subscription) => subscription.offer._id === id);
    }
    return false;
  };

  const handleButtonClick = () => {
    if (isSubscribed()) {
      navigate('/main/subscription');
    } else {
      subscribe();
    }
  };

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 px-4 pb-8'>
      <div className='flex flex-col pt-8 pb-8 bg-orange-50 rounded-md shadow-md hover:scale-105 h-[520px] transition duration-500'>
        <div className='px-8 pb-8'>
          <div className='flex flex-wrap items-center justify-between mb-6'>
            <h3 className='text-lg md:text-xl text-orange-800 font-medium'>{title}</h3>
            {tag && (
            <span className='inline-block py-px px-2 text-xs leading-5 text-white bg-yellow-500 font-medium uppercase rounded-9xl'>
              {tag}
            </span>
            )}
          </div>
          <div className='mb-6'>
            <span className='relative -top-10 right-1 text-3xl text-orange-900 font-bold'>Ar</span>
            <span className='text-6xl md:text-7xl text-orange-900 font-semibold'>{price.slice(0, -2)}</span>
            <span className='inline-block ml-1 text-gray-500 font-semibold'>{price.slice(-2)}</span>
          </div>
          <p className='mb-6 text-orange-400 font-medium'>{description}</p>
          <Button
            type='button'
            onClick={handleButtonClick}
            loading={loading}
            disabled={loading || getLoading}
            className='inline-block h-20 mb-4 w-full text-base md:text-lg leading-6 font-medium text-center bg-orange-500 hover:bg-orange-600 text-white focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-md shadow-sm'
          >
            {(getLoading || loading) && <LoadingOutlined /> }
            {isSubscribed() ? 'Voir l\'abonnement' : 'S\'abonner'}
          </Button>
          <Link to='/main/ticket'>
            <button
              type='button'
              className='inline-block py-3 px-7 w-full  font-medium text-center bg-white hover:bg-orange-100 focus:ring-2 focus:ring-orange-100 focus:ring-opacity-50 rounded-md shadow-sm text-orange-500'
            >
              Voir plus
            </button>
          </Link>
        </div>
        <div className='border-b border-orange-100' />
        <ul className='self-start px-8 pt-8'>
          <li className='flex items-center mb-3 text-gray-500 font-medium'>
            <CheckCircleOutlined className='mr-3' />
            Durée de l'offre
            <span className='pl-2'>
              {`${duration} Jour${duration > 1 ? 's' : ''}`}
            </span>
          </li>
          <li className='flex items-center mb-3 text-gray-500 font-medium'>
            <CheckCircleOutlined className='mr-3' />
            Pour
            <span className='pl-2'>
              {access}
              {' '}
              accès
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PricingCard;
