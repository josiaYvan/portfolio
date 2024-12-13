import {
  Divider, Tag, Tooltip, Table
} from 'antd';
import React from 'react';
import BusImageCarousel from './BusImageCarousel';

function BusDetails({ details }) {
  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Plaque d\'immatriculation',
      dataIndex: 'licensePlate',
      key: 'licensePlate'
    },
    {
      title: 'Marque',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: 'Nombre de sièges',
      dataIndex: 'placeNumber',
      key: 'placeNumber'
    }
  ];

  const data = [
    {
      key: '1',
      name: details.bus.name,
      licensePlate: details.bus.licensePlate,
      brand: details.bus.brand,
      placeNumber: details.bus.placeNumber
    }
  ];

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow'>
      {/* Header */}
      <div className='flex flex-wrap justify-between items-center mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold'>{details.bus.name}</h2>
        <Tooltip title='Consulter les informations de ton bus' color='volcano'>
          <Tag color='black'>{details.bus.licensePlate}</Tag>
        </Tooltip>
      </div>

      {/* Carousel */}
      <BusImageCarousel images={details.bus.images} />

      <Divider />

      {/* Amenities */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-3'>Amenities on board</h3>
        <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-2'>
            <span className='text-lg'>❄️</span>
            <span>A/C</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-lg'>🌐</span>
            <span>Wifi</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-lg'>💳</span>
            <span>NFC</span>
          </div>
        </div>
      </div>

      <Divider />

      {/* Useful Information */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-3'>Informations utiles</h3>
        <div className='flex justify-between items-center mb-6'>
          <div className='flex items-center'>
            <span className='mr-2'>🚍</span>
            <span className='font-bold'>Bus</span>
          </div>
          <div className='text-gray-500 text-sm'>Bon voyage...</div>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          className='mb-4'
          scroll={{ x: 600 }}
        />
      </div>

      {/* Pickup and Destination */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
        <div>
          <p className='font-semibold'>Point de ramassage</p>
          <p className='text-sm text-gray-500'>{details.departure.name}</p>
        </div>
        <div>
          <p className='font-semibold'>Point de destination</p>
          <p className='text-sm text-gray-500'>{details.arrival.name}</p>
        </div>
      </div>

      <Divider />

      {/* Cancellation Policy */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Politique d&#39;annulation et de modification</h3>
        <p className='text-sm text-gray-500'>
          L&#39;annulation et la modification ne sont pas possibles après la validation de la réservation.
        </p>
      </div>

      {/* Closing Message */}
      <div>
        <h3 className='text-lg font-semibold mb-2'>Nous aimons les voyageurs.</h3>
        <p className='text-sm text-gray-500'>
          Notre objectif est de rendre votre expérience fluide et agréable.
        </p>
      </div>
    </div>
  );
}

export default BusDetails;
