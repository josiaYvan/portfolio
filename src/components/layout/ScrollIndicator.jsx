import React from 'react';
import { CaretRightFilled as ArcRight, AliyunOutlined } from '@ant-design/icons';

export function ScrollIndicator() {
  return (
    <div className='absolute right-80 rotate-90 flex space-x-2 items-center'>
      <AliyunOutlined className='text-yellow-500 ' />
      <p className='text-yellow-500 text-xs'>Scroll Down</p>
      <ArcRight className='text-yellow-500' />
    </div>
  );
}
