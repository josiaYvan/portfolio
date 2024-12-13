/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Input, Button, Form, Alert,
  Empty
} from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined, PhoneOutlined } from '@ant-design/icons';
import useTimeout from '../../hooks/useTimeout';
import { getSessionUser } from '../../utils/authentication';
import WalletBox from '../shared/WalletBox';

function RechargeWallet() {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const user = getSessionUser();

  // Timeout callback for clearing the error message
  const [timeout] = useTimeout(() => {
    setErrMsg('');
  }, 2000);

  timeout();

  // Function to handle the recharge
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate an API call
      console.log(values);
      window.location.href = '/main/client';
    } catch (error) {
      setErrMsg('Sorry! Something went wrong. App server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center xl:pt-[5%] p-10 px-4'>
      {/* Header */}
      <h1 className='text-3xl md:text-4xl font-bold mb-6 text-center'>Recharger mon Porte-feuille</h1>
      {!user.wallet ? (
        <Empty
          className='mt-10'
          description={(
            <>
              <span>Oups! Vous ne disposer pas encore de porte-feuille!.</span>
              <div className='mt-5 text-blue-500'>
                <Link to='/main/profile'>Completez votre profile pour l'ouvrir</Link>
              </div>
            </>
          )}
        />
      ) : (
        <>
          <Link to='/main/client' className='mb-10'>
            <WalletBox />
          </Link>
          {/* Mobile Banking Form */}
          <div className='bg-[#F5F5F5] p-8 lg:p-12 shadow-md rounded-2xl w-full max-w-lg'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Via Mobile Banking</h2>
            {errMsg && <Alert message={errMsg} type='error' className='mb-4 text-center' />}
            <Form
              name='recharge-form'
              initialValues={{ remember: true, phone: user.phone }}
              onFinish={onFinish}
              size='large'
              layout='vertical'
            >
              <Form.Item
                name='phone'
                label='Numéro téléphone'
                rules={[{ required: true, message: 'Veuillez entrer votre numéro de téléphone!' }]}
              >
                <Input
                  prefix={<PhoneOutlined className='mr-2' />}
                  addonBefore='+261'
                  placeholder='3X XX XXXX XX'
                />
              </Form.Item>

              <Form.Item
                name='amount'
                label='Somme à recharger'
                rules={[{ required: true, message: 'Veuillez entrer le montant à recharger!' }]}
              >
                <Input
                  placeholder='0'
                  suffix='Ariary'
                />
              </Form.Item>
              <p className='text-sm pb-8 text-gray-400 text-center'>
                Vous recevrez un message de validation de paiement sur votre smartPhone.
              </p>

              <Form.Item className='flex justify-center'>
                <Button
                  type='primary'
                  className='bg-orange-500 hover:bg-blue-600 px-16 py-4 rounded-full font-semibold text-white'
                  disabled={loading}
                  loading={loading}
                  htmlType='submit'
                >
                  {loading ? <LoadingOutlined /> : 'Recharger'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}

export default RechargeWallet;
