/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { Carousel } from 'antd';
import React from 'react';

function BusImageCarousel({ images }) {
  return (
    <Carousel arrows autoplay className='rounded-xl'>
      {images.map((image) => (
        <img
          src={image.url}
          key={image.url}
          alt='image 1'
          className='max-h-[400px] w-full object-cover'
        />
      ))}
    </Carousel>
  );
}

export default BusImageCarousel;
