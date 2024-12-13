import React from 'react';
import {
  Button, Card, Image, Tag
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';
import TravelTimeline from './TravelTimeline';
import { formatDateInFrench, formatMinutesToHoursAndMinutes } from '../../utils/format';

function ResultSearch({ travels }) {
  const navigate = useNavigate();

  const handleReservationClick = (travel) => {
    navigate(`/main/voyage_${travel.id}`);
  };

  return (
    <div>
      <Content className='md:p-8 lg:p-10'>
        <h2 className='text-lg font-semibold mb-4'>. Résultats trouvés .</h2>
        <div className='flex flex-col space-y-4'>
          {travels.map((travel) => (
            <Card
              key={travel.id}
              className='transition-shadow transition-transform duration-300 transform shadow-sm hover:shadow-lg relative'
            >
              <div className='grid grid-cols-1 md:grid-cols-[30%_60%] xl:grid-cols-[20%_70%] gap-6'>
                <div className='w-full h-36 overflow-hidden rounded-lg'>
                  <Image
                    src={travel.bus.images[0].url}
                    alt='travel'
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>

                <div className='relative w-full'>
                  <h3 className='text-xl font-bold'>{travel.bus.name}</h3>
                  <TravelTimeline
                    departure={travel.departure.name}
                    departureTime={travel.departureTime}
                    estimatedTime={formatMinutesToHoursAndMinutes(travel.estimationTime)}
                    destination={travel.arrival.name}
                  />

                </div>
                {/* Tag aligné à droite */}
                <Tag className='absolute top-52 md:top-5 right-5' color='blue'>
                  {formatDateInFrench(travel.date)}
                </Tag>

                {/* Bouton aligné en bas à droite */}
                <div className='absolute bottom-5 right-5'>
                  <Button
                    className='rounded-lg bg-orange-500'
                    type='primary'
                    onClick={() => handleReservationClick(travel)}
                  >
                    Réserver ma place
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Content>
    </div>
  );
}

export default ResultSearch;
