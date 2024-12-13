/* eslint-disable react/no-unescaped-entities */
/**
 * @name Bus'nay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan.  All rights reserved.
 * @version v0.0.1
 *
 */
import {
  BookOutlined, CreditCardOutlined, DollarOutlined, FullscreenExitOutlined, FullscreenOutlined, HomeOutlined, LogoutOutlined, MailOutlined, PartitionOutlined, ProductOutlined, UsergroupAddOutlined, UserOutlined
} from '@ant-design/icons';
import {
  Badge,
  Button, Layout, Menu, Tooltip
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import MyProfile from '../components/tabs/MyProfile';
import useFullScreen from '../hooks/useFullScreen';
import LogoBox from '../components/shared/LogoBox';
import MyAccount from '../components/tabs/MyAccount';
import RechargeWallet from '../components/tabs/RechargeWallet';
import Offers from '../components/tabs/Offers';
import TravelDetails from '../components/travel/TravelDetails';
import { userLogout } from '../utils/funtcion';
import Subscription from '../components/tabs/Subscription';
import { getCharactersAfterUnderscore } from '../utils/format';
import Courier from '../components/tabs/Courier';
import { useSocketContext } from '../context/SocketContext';
import { reFetchData } from '../store/slice/appSlice';
import Member from '../components/tabs/Member';
import { getSessionUser } from '../utils/authentication';
import Console from '../components/tabs/Console';
import { Pickup } from '../components/travel/Pickup';

const {
  Header, Content, Footer, Sider
} = Layout;

function Main() {
  window.document.title = 'Bus`nay — Main';
  const { isFullscreen, toggleFullScreen } = useFullScreen();
  const [selectedKeys, setSelectedKeys] = useState('0');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tab } = useParams();
  const { hasNewNotif } = useSocketContext();
  const [id, setId] = useState(null);
  const user = getSessionUser();

  const handleTabChange = (key) => {
    switch (key) {
      case '0': {
        navigate('/main/client');
        break;
      }
      case '1': {
        navigate('/main/compte');
        break;
      }
      case '2': {
        navigate('/main/recharge');
        break;
      }
      case '3': {
        navigate('/main/profile');
        break;
      }
      case '4': {
        navigate('/main/offre');
        break;
      }
      case '5': {
        navigate('/main/voyage');
        break;
      }
      case '6': {
        navigate('/main/trajet');
        break;
      }
      case '7': {
        navigate('/main/subscription');
        break;
      }
      case '9': {
        dispatch(reFetchData());
        navigate('/main/courrier');
        break;
      }
      case '10': {
        navigate('/main/membre');
        break;
      }
      case '8': {
        userLogout();
        break;
      }
      default: {
        navigate('/main/client');
      }
    }
  };

  useEffect(() => {
    if (tab) {
      if (tab === 'client') setSelectedKeys('0');
      else if (tab === 'compte' && user.role !== 'SOCIETY_ROLE') setSelectedKeys('1');
      else if (tab === 'recharge' && user.role !== 'SOCIETY_ROLE') setSelectedKeys('2');
      else if (tab === 'profile') setSelectedKeys('3');
      else if (tab === 'offre' && user.role !== 'SOCIETY_ROLE') setSelectedKeys('4');
      else if (tab && tab.startsWith('voyage') && user.role !== 'SOCIETY_ROLE') {
        setId(getCharactersAfterUnderscore(tab));
        setSelectedKeys('5');
      } else if (tab === 'trajet' && user.role !== 'SOCIETY_ROLE') setSelectedKeys('6');
      else if (tab === 'subscription' && user.role !== 'SOCIETY_ROLE') setSelectedKeys('7');
      else if (tab === 'logout') setSelectedKeys('8');
      else if (tab === 'courrier') setSelectedKeys('9');
      else if (tab === 'membre' && user.role === 'SOCIETY_ROLE') setSelectedKeys('10');
      else navigate('/not-found');
    }
  }, [tab, navigate]);

  useEffect(() => {
    switch (selectedKeys) {
      case '0': {
        window.document.title = 'Bus`nay — Console client';
        break;
      }
      case '1': {
        window.document.title = 'Bus`nay — Porte-feuille';
        break;
      }
      case '2': {
        window.document.title = 'Bus`nay — Recharge';
        break;
      }
      case '3': {
        window.document.title = 'Bus`nay — Profile';
        break;
      }
      case '4': {
        window.document.title = 'Bus`nay — Offre';
        break;
      }
      case '5': {
        window.document.title = 'Bus`nay — Voyage';
        break;
      }
      case '6': {
        window.document.title = 'Bus`nay — Information du trajet';
        break;
      }
      case '7': {
        window.document.title = 'Bus`nay — Abonnement';
        break;
      }
      case '9': {
        window.document.title = 'Bus`nay — Courrier';
        break;
      }
      case '10': {
        window.document.title = 'Bus`nay — Membre';
        break;
      }
      default: {
        window.document.title = 'Bus`nay — Client';
      }
    }
  }, [selectedKeys]);

  const menuItems = [
    {
      key: '0',
      icon: <HomeOutlined />,
      label: 'Console',
      visible: true
    },
    {
      key: '1',
      icon: <CreditCardOutlined />,
      label: 'Porte-feuille',
      visible: user.role !== 'SOCIETY_ROLE'
    },
    {
      key: '2',
      icon: <DollarOutlined />,
      label: 'Recharger compte',
      visible: user.role !== 'SOCIETY_ROLE'
    },
    {
      key: '3',
      icon: <UserOutlined />,
      label: 'Profile',
      visible: true
    },
    {
      key: '4',
      icon: <ProductOutlined />,
      label: 'Offre',
      visible: user.role !== 'SOCIETY_ROLE'
    },
    {
      key: '6',
      icon: <PartitionOutlined />,
      label: 'Trajet',
      visible: user.role !== 'SOCIETY_ROLE'
    },
    {
      key: '10',
      icon: <UsergroupAddOutlined />,
      label: 'Membre',
      visible: user.role === 'SOCIETY_ROLE'
    },
    {
      key: '7',
      icon: <BookOutlined />,
      label: 'Abonnement',
      visible: user.role !== 'SOCIETY_ROLE'
    },
    {
      key: '9',
      icon: <Badge dot={hasNewNotif}><MailOutlined /></Badge>,
      label: 'Courrier',
      visible: true
    },
    {
      key: '8',
      icon: <LogoutOutlined />,
      label: 'Logout',
      visible: true
    }
  ];
  const filteredMenuItems = menuItems.filter((item) => item.visible);

  return (
    <Layout className='w-full h-screen'>
      <Sider className='!bg-white' breakpoint='lg'>
        <LogoBox />

        <Menu
          theme='light'
          mode='inline'
          selectedKeys={[selectedKeys]}
          onClick={(e) => {
            handleTabChange(e.key);
          }}
          items={filteredMenuItems}
        />
      </Sider>

      <Layout>
        <Header className='hidden p-0 !bg-bg-white'>
          <Link to='/main/dashboard'>
            <img
              className='h-[65px] mx-auto'
              alt='beach-resort-logo'
              src={Logo}
            />
          </Link>

          {/* full screen toggle button */}
          <Tooltip title='Click to toggle Full Screen' placement='left'>
            <Button
              className='absolute right-5 top-5'
              icon={isFullscreen ?
                (<FullscreenExitOutlined className='' />) :
                (<FullscreenOutlined className='' />)}
              onClick={toggleFullScreen}
              shape='default'
              type='default'
              size='middle'
            />
          </Tooltip>
        </Header>

        <Content className='bg-bg-white overflow-y-scroll m-2 p-2'>
          {selectedKeys === '0' && (<Console />)}
          {selectedKeys === '1' && (<MyAccount />)}
          {selectedKeys === '2' && (<RechargeWallet />)}
          {selectedKeys === '3' && (<MyProfile />)}
          {selectedKeys === '4' && (<Offers />)}
          {selectedKeys === '5' && (<TravelDetails id={id} />)}
          {selectedKeys === '6' && (<Pickup />)}
          {selectedKeys === '7' && (<Subscription />)}
          {selectedKeys === '9' && (<Courier />)}
          {selectedKeys === '10' && (<Member />)}
        </Content>

        <Footer className='text-center font-text-font font-medium '>
          ©2024 Bus'nay — Developed By
          {' '}
          <a
            className='text-color-primary hover:text-color-secondary'
            href='https://www.linkedin.com/in/josia-yvan/'
            target='_blank'
            rel='noreferrer'
          >
            Mr. Josia Yvan
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default React.memo(Main);
