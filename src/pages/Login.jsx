/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Alert, Button, Divider, Form, Input
} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useTimeout from '../hooks/useTimeout';
import ApiService from '../utils/apiService';
import { setSessionUserAndToken } from '../utils/authentication';

function Login() {
  window.document.title = 'Bus`nay — Login';
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // timeout callback
  const [timeout] = useTimeout(() => {
    setErrMsg('');
  }, 5000);

  timeout();

  // function to handle user login
  const onFinish = async (values) => {
    console.log(values, '..');
    try {
      setLoading(true);
      const response = await ApiService.post('/auth/login', values);
      if (response?.result_code === 0) {
        setSessionUserAndToken(response?.result?.data, response?.access_token, response?.refresh_token);
        window.location.href = '/main/client';
        setLoading(false);
      } else {
        setErrMsg('Sorry! Something went wrong. App server error');
        setLoading(false);
      }
    } catch (error) {
      console.log(error, '///node_modules');
      setErrMsg(error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      setLoading(false);
    }
  };

  return (
    <section className='flex flex-col h-screen items-center justify-center'>
      <div className='w-[90%] md:w-[550px] rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 lg:p-16'>
        <Link to='/'>
          <img
            className='h-12 mx-auto mb-6'
            alt='beach-resort-logo'
            src='/logo.ico'
          />
        </Link>

        <Divider className='!mb-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-center text-[#000]'>Authentification</h1>
        </Divider>

        <div className=' text-center font-light text-[#6B7280] mb-8'>
          Vous n'avez cas de compte ?
          <Link to='/auth/signup' className='text-blue-500 ml-2'>Créer mon compte</Link>
        </div>

        {errMsg && <Alert message={errMsg} type='error' className='!text-center' />}

        <Form
          name='beach-resort-login'
          className='login-form mt-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size='large'
        >
          <label htmlFor='confirm' className='block mb-2 text-sm font-medium text-[#111827]'>Email</label>
          <Form.Item
            name='email'
            rules={[{
              type: 'email',
              required: true,
              message: 'Please input your Email!'
            }]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon mr-2' />}
              placeholder='Entrez votre Email'
              allowClear
            />
          </Form.Item>

          <label htmlFor='confirm' className='block mb-2 text-sm font-medium text-[#111827]'>Mot de passe</label>
          <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Entrez votre mot de passe!'
            }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon mr-2' />}
              type='password'
              placeholder='Enter here your Password'
              allowClear
            />
          </Form.Item>

          {/* FORM SUBMIT BUTTON */}
          <Form.Item>
            <Button
              className='login-form-button mt-5 bg-orange-500 '
              disabled={loading}
              loading={loading}
              htmlType='submit'
              type='primary'
              block
            >
              {loading ? <LoadingOutlined /> : 'Login'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default React.memo(Login);
