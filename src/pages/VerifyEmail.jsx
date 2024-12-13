import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../utils/apiService';
import notificationWithIcon from '../utils/notification';

function VerifyEmail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = () => new Promise((resolve, reject) => {
    setLoading(true);
    ApiService.post(`/auth/verify-email/${id}`)
      .then((res) => {
        if (res?.result_code === 0) {
          notificationWithIcon('success', 'SUCCESS', res?.result?.message || 'Verification link send successful');
          resolve();
          navigate('/main/client');
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
          reject();
        }
      })
      .catch((err) => {
        notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
        reject();
      });
    setLoading(false);
  }).catch(() => notificationWithIcon('error', 'ERROR', 'Oops errors!'));

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
          <h1 className='text-4xl md:text-3xl font-bold text-center text-[#000]'>Finalisation de l&#39;inscription</h1>
        </Divider>

        <div className='text-center font-light text-[#6B7280] mb-8'>
          Pour finaliser votre inscription, veuillez cliquer sur le bouton de confirmation.
          <br />
          Une fois que vous aurez cliqué sur le bouton ci-dessous, votre compte sera activé et prêt à être utilisé !
        </div>

        {/* {errMsg && <Alert message={errMsg} type='error' className='!text-center' />} */}

        <Button
          className='verification-form-button mt-5 bg-orange-500'
          onClick={handleVerifyEmail}
          htmlType='submit'
          type='primary'
          block
          size='large'
        >
          {loading ? <LoadingOutlined /> : 'Valider'}
        </Button>
      </div>
    </section>
  );
}

export default VerifyEmail;
