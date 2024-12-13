/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import useFetchData from '../../hooks/useFetchData';

const { Option } = Select;

function SearchBar({ query, setQuery, onSearch }) {
  const [fetchSpotsLoading, fetchSpotsError, fetchSpotsResponse] = useFetchData('/all-spots-list');
  const [spots, setSpots] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    if (fetchSpotsResponse?.data?.rows) {
      setSpots(fetchSpotsResponse.data.rows);
    }
  }, [fetchSpotsResponse]);

  const handleFromChange = (value) => {
    setFrom(value);
    setQuery((prev) => ({ ...prev, from: value }));
  };

  const handleToChange = (value) => {
    setTo(value);
    setQuery((prev) => ({ ...prev, to: value }));
  };

  const handleDateChange = (date) => {
    if (date) {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      setQuery((prev) => ({ ...prev, date: formattedDate }));
    } else {
      setQuery((prev) => ({ ...prev, date: null }));
    }
  };

  const handleSwap = () => {
    setFrom((prevFrom) => {
      const newTo = prevFrom;
      const newFrom = to;
      setTo(newTo);
      return newFrom;
    });
    setQuery((prev) => ({ ...prev, from: to, to: from }));
  };

  return (
    <div className='flex flex-col md:flex-row items-center bg-white shadow-md h-auto mt-20 rounded-xl max-w-[750px] mx-auto md:p-1 p-4'>
      <div className='flex flex-col md:flex-row items-center w-full'>
        <Select
          placeholder='De:'
          className='mx-2 my-2 rounded-lg w-full md:w-48 sm:text-sm text-xs'
          loading={fetchSpotsLoading}
          onChange={handleFromChange}
          allowClear
          value={from}
        >
          {spots.map((spot) => (
            <Option key={spot._id} value={spot._id} disabled={spot._id === to}>
              {spot.name}
            </Option>
          ))}
        </Select>

        <Button
          className='flex justify-center cursor-pointer border bg-gray-100 w-8 h-8 sm:w-10 sm:h-10 p-1 sm:p-2 rounded-3xl text-orange-500 my-2 md:my-0'
          onClick={handleSwap}
        >
          ⇄
        </Button>

        <Select
          placeholder='Vers:'
          className='mx-2 my-2 rounded-lg w-full md:w-48 sm:text-sm text-xs'
          loading={fetchSpotsLoading}
          onChange={handleToChange}
          allowClear
          value={to}
        >
          {spots.map((spot) => (
            <Option key={spot._id} value={spot._id} disabled={spot._id === from}>
              {spot.name}
            </Option>
          ))}
        </Select>

        <DatePicker
          className='mx-2 my-2 w-full md:w-auto rounded-lg sm:text-sm text-xs'
          placeholder='Pour'
          onChange={handleDateChange}
        />
      </div>

      <Button
        type='primary'
        className='bg-orange-500 mx-4 my-2 text-white rounded-lg w-full md:w-auto sm:text-sm text-xs'
        onClick={() => onSearch(query)}
      >
        <SearchOutlined />
      </Button>
    </div>

  );
}

export default SearchBar;
