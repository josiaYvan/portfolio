import React from 'react';
import { CaretRightFilled as ArcRight, AliyunOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

export function ScrollIndicator({ themeIsDark }) {
  return (
    <div className='absolute right-80 bottom-36 rotate-90 flex space-x-2 items-center'>
      <AliyunOutlined className='text-yellow-500' style={{ color: !themeIsDark && myStyle.brown }} />
      <p className='text-yellow-500 text-xs' style={{ color: !themeIsDark && myStyle.brown }}>Scroll Down</p>
      <ArcRight className='text-yellow-500' style={{ color: !themeIsDark && myStyle.brown }} />
    </div>
  );
}
