/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Divider, Tooltip } from 'antd';

const SeatStatus = {
  FREE: 'free',
  OCCUPIED: 'occupied',
  SPECIAL: 'special'
};

function Seat({ status = SeatStatus.FREE }) {
  const getSeatImage = () => {
    if (status === SeatStatus.OCCUPIED) return '/vectors/free_seat.svg';
    return status === SeatStatus.SPECIAL ? '/vectors/volant_bus.svg' : '/vectors/free_seat.svg';
  };

  return (
    <Tooltip title={status === SeatStatus.SPECIAL ? 'Steering Wheel' : 'Free seat'}>
      <div
        className='w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 mx-1 xl:mx-1 xl:my-1 cursor-pointer flex justify-center items-center rounded hover:shadow-md transition-shadow'
        role='button'
        aria-label='Seat'
      >
        <img src={getSeatImage()} alt='seat' className='' />
      </div>
    </Tooltip>
  );
}

function EmptySeat() {
  return <div className='w-12 h-12 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 mx-1 my-1 xl:mx-2 xl:my-2  bg-transparent' />;
}

function Aisle() {
  return <div className='w-4 h-8 xl:h-12 mx-4 bg-gray-300' />;
}

function SeatView({ seatsLayout, aislePosition }) {
  const seats = [];

  seatsLayout.forEach((seat) => {
    const { row, column, status } = seat;
    if (!seats[row]) {
      seats[row] = Array(aislePosition * 2).fill(null);
    }
    seats[row][column] = status;
  });

  return (
    <Card className='shadow'>
      <p className='text-md text-center font-bold mb-2'>. Réservez votre place .</p>
      <Divider />
      <div className='flex flex-col items-center'>
        <div className='xl:p-4 w-[100%]'>
          {seats.map((row, rowIndex) => (
            <div className='flex justify-center items-center mb-2' key={rowIndex}>
              {row.slice(0, aislePosition).map((seatStatus, colIndex) => (seatStatus ? <Seat key={colIndex} status={seatStatus} /> : <EmptySeat key={colIndex} />))}
              <Aisle />
              {row.slice(aislePosition).map((seatStatus, colIndex) => (seatStatus ? (
                <Seat key={colIndex + aislePosition} status={seatStatus} />
              ) : (
                <EmptySeat key={colIndex + aislePosition} />
              )))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default SeatView;
