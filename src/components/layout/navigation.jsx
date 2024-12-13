import { Header } from 'antd/es/layout/layout';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { myStyle } from '../../utils/style';

function Navbar() {
  return (
    <Header style={{ backgroundColor: myStyle.bg }} className='px-72 h-18 shadow-md'>
      <div className='flex text-yellow-500 items-center mt-5 justify-between shadow-0'>
        <div className='text-lg'>Josia Y.</div>
        <div className='text-lg'>
          <MoonOutlined />
          <SunOutlined />
        </div>
      </div>
    </Header>
  );
}

export default Navbar;
