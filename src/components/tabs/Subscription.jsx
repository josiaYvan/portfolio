/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Card, Skeleton, Tooltip } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getSessionUser } from '../../utils/authentication';
import useFetchData from '../../hooks/useFetchData';

function Subscription() {
  const user = getSessionUser();
  const navigate = useNavigate();
  const [loading, error, response] = useFetchData(`/subscription/by-user-email/${user.id}`);

  return (
    <div className=' p-6 xl:p-10'>
      <div className='text-left mb-20'>
        <h1 className='text-3xl md:text-4xl font-bold'>Mes abonnements</h1>
      </div>

      {loading ? (
        <Skeleton active />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {response?.data.rows.map((subscription) => (
            <Tooltip title='Utiliser pour mon trajet' placement='top'>
              <Card
                onClick={() => navigate('/main/trajet')}
                key={subscription._id}
                title={<span className='text-3xl text-cyan-700 font-semibold'>{subscription.offer.title}</span>}
                bordered={false}
                className='bg-[#D8FAF5] shadow-md p-5 rounded-md hover:scale-105 transition duration-500'
              >
                <div className='flex flex-col items-start'>
                  <p className='text-gray-700 font-medium'>{subscription.offer.description}</p>
                  <div className='flex items-center mt-4 text-gray-600'>
                    <CheckCircleOutlined className='mr-2' />
                    <span>{`Accès: ${subscription.offer.access} par jour`}</span>
                  </div>
                  <div className='flex items-center mt-2 text-gray-600'>
                    <CheckCircleOutlined className='mr-2' />
                    <span>{`Durée: ${subscription.offer.duration} Jour${subscription.offer.duration > 1 ? 's' : ''}`}</span>
                  </div>
                  <div className='mt-4'>
                    <span className='text-orange-600 font-semibold'>{`Date d'expiration: ${new Date(subscription.expiredSubscriptionDate).toLocaleDateString()}`}</span>
                  </div>
                </div>
              </Card>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subscription;
