/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  Select, Button, Typography, Divider,
  Input
} from 'antd';
import { formatDateInFrench, formatMinutesToHoursAndMinutes } from '../../utils/format';
import TravelTimeline from './TravelTimeline';

const { Text } = Typography;

function TravelPlan({ plan }) {
  const [passagers, setPassagers] = useState(1);

  return (
    <div className='mx-auto p-6 bg-white rounded-md shadow'>
      <h2 className='text-lg font-semibold mb-4'>Planifiez votre trajet</h2>

      <div className='mb-4'>
        <Text strong>Date et heure de départ</Text>
        <Input
          readOnly
          value={formatDateInFrench(plan.date)}
          className='w-full mb-2'
        />
        <Input
          readOnly
          value={plan.departureTime}
          className='w-full'
        />
      </div>

      <Divider />
      <div className='text-orange-600 text-sm font-medium mb-4'>
        <a href='#' className='hover:underline'>Details du voyage</a>
      </div>
      <TravelTimeline
        departure={plan.departure.name}
        departureTime={plan.departureTime}
        estimatedTime={formatMinutesToHoursAndMinutes(plan.estimationTime)}
        destination={plan.arrival.name}
      />
      <div className='mb-4 -mt-5'>
        <Text strong>Place du passager</Text>
        <Select
          value={passagers}
          onChange={(value) => setPassagers(value)}
          className='w-full'
        >
          <Select.Option value={1}>
            Siège
            <b> 1-A</b>
          </Select.Option>
        </Select>
      </div>

      <Divider />
      <div className='mb-4 flex justify-between items-center'>
        <span>Ticket</span>
        <span className='font-semibold'>
          One Passe
          {' '}
        </span>
      </div>

      <Button
        type='primary'
        className='w-full bg-orange-500'
        onClick={() => { /* Logique pour continuer */ }}
      >
        Confirmer
      </Button>
    </div>
  );
}

export default TravelPlan;
