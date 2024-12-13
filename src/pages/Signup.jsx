/* eslint-disable no-unreachable */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { LoadingOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import {
  Alert, Button, Divider, Form, Input,
  Select
} from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTimeout from '../hooks/useTimeout';
import ApiService from '../utils/apiService';
import notificationWithIcon from '../utils/notification';

function Signup() {
  window.document.title = 'Bus`nay — Signup';
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  // timeout callback
  const [timeout] = useTimeout(() => {
    setErrMsg('');
  }, 10000);

  timeout();

  // function to handle user signup
  const onFinish = async (values) => {
    if (values.password !== values.confirmedPassword) {
      setErrMsg('Veuillez verifier l\'integrité des mots de passe!');
      return null;
    }
    try {
      setLoading(true);
      const response = await ApiService.post('/auth/registration', values);
      if (response?.result_code === 0) {
        setLoading(false);
        navigate('/auth/login');
        notificationWithIcon('success', 'SUCCESS', 'Votre compte a été bien créé!');
        notificationWithIcon('info', 'INFO', 'Veuillez verifier votre mail pour continuer!', 30);
        setErrMsg('Sorry! Something went wrong. App server error');
        setLoading(false);
      }
    } catch (error) {
      const err = error?.response?.data?.result?.error;
      if (typeof err === typeof '') {
        setErrMsg(err);
      } else {
        err.email !== '' && setErrMsg(err.email || 'Sorry! Something went wrong. App server error');
        err.password !== '' && setErrMsg(err.password || 'Sorry! Something went wrong. App server error');
      }
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
          <h1 className='text-4xl md:text-3xl font-bold text-center text-[#000]'>Inscription</h1>
        </Divider>

        <div className='text-center font-light text-[#6B7280] mb-8'>
          Vous avez déjà un compte ?
          <Link to='/auth/login' className='text-blue-500 ml-2'>Se connecter</Link>
        </div>

        {errMsg && <Alert message={errMsg} type='error' className='!text-center' />}

        <Form
          name='beach-resort-login'
          className='login-form mt-5'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size='large'
        >
          <label htmlFor='confirm' className='block mb-2 text-sm font-medium text-[#111827]'>Qui êtes-vous ?</label>
          <Form.Item
            name='role'
            rules={[{
              required: true,
              message: 'Veuillez chosir!'
            }]}
          >
            <Select
              placeholder='-- select --'
              optionFilterProp='children'
              options={[
                { value: 'STUDENT_ROLE', label: 'Etudiant' },
                { value: 'SOCIETY_ROLE', label: 'Entreprise' },
                { value: 'USER_ROLE', label: 'Autre' }
              ]}
              size='large'
              allowClear
            />
          </Form.Item>

          <label htmlFor='confirm' className='block mb-2 text-sm font-medium text-[#111827]'>Email</label>
          <Form.Item
            name='email'
            rules={[{
              type: 'email',
              required: true,
              message: 'Entrer votre Email!'
            }]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon mr-2' />}
              placeholder='Enter here your Email'
              allowClear
            />
          </Form.Item>

          <label htmlFor='confirm' className='block mb-2 text-sm font-medium text-[#111827]'>Mot de passe</label>
          <Form.Item
            name='password'
            rules={[{
              required: true,
              message: 'Please input your Password!'
            }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon mr-2' />}
              placeholder='Enter here your Password'
              type='password'
              allowClear
            />
          </Form.Item>

          <label htmlFor='confirm' className='block mb-2 text-sm font-medium text-[#111827]'>Confirmer le mot de passe</label>
          <Form.Item
            name='confirmedPassword'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Veuillez confirmer votre mot de passe!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Les mots de passe ne correspondent pas!'));
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon mr-2' />}
              placeholder='Confirm your Password'
              type='password'
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
              {loading ? <LoadingOutlined /> : 'S\'inscrire'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}

export default React.memo(Signup);
