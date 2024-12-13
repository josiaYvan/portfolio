/* eslint-disable react/jsx-closing-tag-location */
import { ClockCircleOutlined } from '@ant-design/icons';
import { Tag, Timeline } from 'antd';
import React from 'react';

function TravelTimeline({
  departure, departureTime, estimatedTime, destination
}) {
  return (
    <Timeline
      className='mt-5'
      items={[
        {
          children: <p>
            {' '}
            {departure}
            {' '}
            <span className='text-gray-300'>depart à</span>
            {' '}
            <b>{departureTime}</b>
          </p>
        },
        {
          dot: <ClockCircleOutlined className='timeline-clock-icon' />,
          color: 'orange',
          children: <Tag color='orange'>
            {estimatedTime}
          </Tag>
        },
        {
          children: destination,
          color: 'green'
        }
      ]}
    />
  );
}

export default TravelTimeline;
