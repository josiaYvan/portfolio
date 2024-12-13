import React, { useState } from 'react';
import {
  Empty, Pagination, Result, Skeleton
} from 'antd';
import useFetchData from '../../hooks/useFetchData';
import PricingCard from './pricing_card';

function PricingSection() {
  const [query, setQuery] = useState({
    search: '', sort: 'asce', page: '1', rows: '10'
  });
  const [loading, error, response] = useFetchData(`/all-offers-list?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`);

  return (
    <section
      id='pricing'
      className='bg-white'
      style={{
        backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
        backgroundPosition: 'center'
      }}
    >
      <div className='text-center'>
        <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-gray-500 bg-orange-100 font-medium uppercase rounded-9xl'>
          Tarif
        </span>
        <h3 className='mb-4 text-3xl md:text-5xl text-coolGray-900 font-bold tracking-tighter'>
          La meilleure solution, au meilleur prix.
        </h3>
        <p className='mb-12 text-lg md:text-xl text-gray-500 font-medium'>
          Choisis ton offre
        </p>
      </div>
      <div className='flex flex-wrap justify-center -mx-4'>
        {loading ? (
          <Skeleton paragraph={{ rows: 3 }} active />
        ) : error ? (
          <Result
            title='Échec de la récupération'
            subTitle='Impossible de charge cette page!'
            status='error'
          />
        ) : (response?.data?.rows?.length > 0 ? (
          response.data.rows.map((offer) => (
            (offer.status === 'disponible') && (
            <PricingCard
              key={offer.id} // Assurez-vous que `id` est unique pour chaque offre
              id={offer.id}
              title={offer.title}
              price={offer.price}
              description={offer.description}
              access={offer.access}
              tag={offer.tag}
              duration={offer.duration}
            />
            )
          ))
        ) : (
          <Empty
            className='mt-10'
            description={<span>Sorry! No data found.</span>}
          />
        ))}
      </div>

      {/* Pagination */}
      {response?.data?.total_count > 10 && ( // Ajusté pour total_count correct
        <Pagination
          className='my-5'
          onChange={(page) => setQuery((prevState) => ({ ...prevState, page: page.toString() }))}
          total={response?.data?.total_count || 0} // Fallback en cas d'absence de `total_count`
          current={parseInt(query.page, 10)}
          pageSize={parseInt(query.rows, 10)}
        />
      )}
    </section>
  );
}

export default PricingSection;
