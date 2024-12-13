import React, { useEffect, useState } from 'react';
import {
  Empty, Pagination, Result, Skeleton
} from 'antd';
import SearchBar from '../travel/SearchBar';
import ResultSearch from '../travel/ResultSearch';
import useFetchData from '../../hooks/useFetchData';

function Travel() {
  const initQuery = {
    from: '',
    to: '',
    date: null,
    sort: 'asce',
    page: '1',
    rows: '7'
  };
  const [query, setQuery] = useState(initQuery);
  const [url, setUrl] = useState('/all-trajets-list');

  useEffect(() => {
    // Construction dynamique de l'URL en excluant les paramètres non définis
    const params = [`limit=${query.rows}`, `page=${query.page}`, `sort=${query.sort}`];
    if (query.from) params.push(`from=${query.from}`);
    if (query.to) params.push(`to=${query.to}`);
    if (query.date) params.push(`date=${query.date}`);

    setUrl(`/all-trajets-list${params.length ? `?${params.join('&')}` : ''}`);
  }, [query.from, query.to, query.date, query.rows, query.page, query.sort]);

  const [loading, error, response] = useFetchData(url);

  return (
    <div className='container bg-gray-50 mx-auto py-6 sm:p-6 xl:p-10'>
      <h1 className='float-left text-3xl md:text-4xl font-bold'>
        Trouver
        {' '}
        <span className='text-3xl md:text-4xl text-[#4B9A90] font-bold'>votre trajet</span>
      </h1>
      <SearchBar query={query} setQuery={setQuery} disabledSearch={loading} />
      <div className='mt-5'>

        {error ? (
          <Result title='Échec de la récupération' subTitle='Impossible de charge cette page!' status='error' />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.data?.rows?.length === 0 ? (
              <Empty className='mt-10' description={<span>Sorry! No data found.</span>} />
            ) : (
              <ResultSearch travels={response?.data?.rows} />
            )}
          </Skeleton>
        )}
        {/* Bus list — pagination */}
        {response?.data?.total_page > 1 && (
        <Pagination
          className='my-5'
          onChange={(e) => setQuery((prevState) => ({ ...prevState, page: e }))}
          total={response?.data?.total_page * 10}
          current={response?.data?.current_page}
        />
        )}
      </div>
    </div>
  );
}

export default Travel;
