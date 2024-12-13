import React from 'react';
import { Result, Skeleton } from 'antd';
import SeatView from '../bus/BusSeat';
import TravelPlan from './TravelPlan';
import BusDetails from '../bus/BusDetail';
import useFetchData from '../../hooks/useFetchData';
import { MapView } from './Map';

function TravelDetails({ id }) {
  const [loading, error, response] = useFetchData(`/trajet/${id}`);
  return (
    <div className='container bg-gray-50 mx-auto sm:p-6 xl:p-10'>
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
        {error ? (
          <Result title='Échec de la récupération' subTitle='Impossible de charge cette page!' status='error' />
        ) : (
          <div className='max-w-[1300px] mx-auto'>
            <h1 className='text-4xl text-gray-300 font-bold'>Confirmez votre réservation</h1>

            <div className='flex flex-col md:flex-row mt-4 gap-4'>
              <div className='md:w-2/3'>
                <BusDetails details={response?.data} />
                <MapView arrival={response?.data?.arrival} departure={response?.data?.departure} />
              </div>

              <div className='md:w-1/3'>
                <TravelPlan plan={response?.data} />
                <div className='m-4' />
                <SeatView seatsLayout={response?.data?.bus?.seatsLayout} aislePosition={response?.data?.bus?.aislePosition} />
              </div>
            </div>
          </div>
        )}
      </Skeleton>
    </div>
  );
}

export default TravelDetails;
