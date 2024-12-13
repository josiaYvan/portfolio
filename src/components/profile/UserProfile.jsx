/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { PlusOutlined } from '@ant-design/icons';
import {
  Button, DatePicker, Form, Image, Input, Skeleton, Upload, Select,
  Alert,
  Space
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import { reFetchData } from '../../store/slice/appSlice';
import StudentProfile from './StudentProfile';
import SocietyProfile from './SocietyProfile';
import useFetchData from '../../hooks/useFetchData';
import { getSessionUser, setSessionUserKeyAgainstValue } from '../../utils/authentication';

function UserProfile({ user, isProfileComplete }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const userSession = getSessionUser();
  const navigate = useNavigate();

  // TODO: à corriger pour le cas de user tout court
  const [fetchLoading, error, response] = useFetchData(`/get-${user?.role === 'SOCIETY_ROLE' ? 'society' : 'student'}-by-user-id/${user?.id}`);

  const labels = {
    name: 'Nom',
    firstname: 'Prénom',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    district: 'Quartier',
    birthday: 'Date de naissance',
    birthplace: 'Lieu de naissance',
    sexe: 'Sexe',
    identityCard: 'Numéro de Carte d\'identité',
    occupation: 'Profession'
  };

  useEffect(() => {
    const data = response?.data;
    if (data?.user || error) {
      form.setFieldsValue({
        name: user?.name,
        firstname: user?.firstname,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        district: user?.district,
        birthday: user?.birthday ? dayjs(user.birthday) : null,
        birthplace: user?.birthplace,
        sexe: user?.sexe,
        identityCard: user?.identityCard,
        occupation: user?.occupation
      });
      if (user?.role === 'SOCIETY_ROLE') {
        form.setFieldsValue({
          society_name: data?.name,
          society_email: data?.email,
          society_numero: data?.numero,
          society_spot: data?.spot,
          society_nif: data?.nif,
          society_stat: data?.stat,
          society_activity: data?.activity
        });
      }
      if (user?.role === 'STUDENT_ROLE') {
        form.setFieldsValue({
          school: data?.school,
          spot: data?.spot,
          idCard: data?.idCard,
          branch: data?.branch,
          responsableNumber: data?.responsableNumber
        });
      }
    }
  }, [user, form, response]);

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  const onFinish = async (values) => {
    const userFormData = new FormData();
    userFormData.append('_id', user.id);
    userFormData.append('email', values.email);
    userFormData.append('name', values.name);
    userFormData.append('firstname', values.firstname);
    userFormData.append('birthday', values.birthday);
    userFormData.append('birthplace', values.birthplace);
    userFormData.append('address', values.address);
    userFormData.append('district', values.district);
    userFormData.append('occupation', values.occupation);
    userFormData.append('identityCard', values.identityCard);
    userFormData.append('sexe', values.sexe);
    userFormData.append('phone', values.phone);

    const societyData = {
      user: user.id,
      name: values.society_name,
      email: values.society_email,
      numero: values.society_numero,
      spot: values.society_spot,
      nif: values.society_nif,
      stat: values.society_stat,
      activity: values.society_activity
    };
    const studentData = {
      user: user.id,
      school: values.school,
      spot: values.spot,
      idCard: values.idCard,
      branch: values.branch,
      responsableNumber: values.responsableNumber
    };

    // Append uploaded files
    if (fileList.length > 1) {
      fileList.forEach((file) => userFormData.append('identityCard_images', file.originFileObj));
    }

    setLoading(true);

    try {
      const userResponse = await ApiService.put('/update-user', userFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(userResponse, 'user response');
      if (userResponse?.result_code !== 0) return notificationWithIcon('error', 'ERROR', userResponse?.data?.result?.error || 'Server error');
      if (userResponse?.result?.data?.id === userSession.id) {
        // update local storage session user data
        setSessionUserKeyAgainstValue('name', userResponse?.result?.data?.name);
        setSessionUserKeyAgainstValue('firstname', userResponse?.result?.data?.firstname);
        setSessionUserKeyAgainstValue('email', userResponse?.result?.data?.email);
        setSessionUserKeyAgainstValue('phone', userResponse?.result?.data?.phone);
        setSessionUserKeyAgainstValue('address', userResponse?.result?.data?.address);
        setSessionUserKeyAgainstValue('district', userResponse?.result?.data?.district);
        setSessionUserKeyAgainstValue('birthday', userResponse?.result?.data?.birthday);
        setSessionUserKeyAgainstValue('birthplace', userResponse?.result?.data?.birthplace);
        setSessionUserKeyAgainstValue('sexe', userResponse?.result?.data?.sexe);
        setSessionUserKeyAgainstValue('identityCard', userResponse?.result?.data?.identityCard);
        setSessionUserKeyAgainstValue('occupation', userResponse?.result?.data?.occupation);
      }

      if (user?.role === 'SOCIETY_ROLE') {
        const societyResponse = await ApiService.put('/create-update-society', societyData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(societyResponse, 'society response');
        if (societyResponse?.result?.data?.user === userSession.id) {
          // update local storage session society data
          setSessionUserKeyAgainstValue('name', societyResponse?.result?.data?.name);
          setSessionUserKeyAgainstValue('email', societyResponse?.result?.data?.email);
          setSessionUserKeyAgainstValue('numero', societyResponse?.result?.data?.numero);
          setSessionUserKeyAgainstValue('spot', societyResponse?.result?.data?.spot);
          setSessionUserKeyAgainstValue('nif', societyResponse?.result?.data?.nif);
          setSessionUserKeyAgainstValue('stat', societyResponse?.result?.data?.stat);
          setSessionUserKeyAgainstValue('activity', societyResponse?.result?.data?.activity);
        }
      }
      if (user?.role === 'STUDENT_ROLE') {
        const studentResponse = await ApiService.put('/create-update-student', studentData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(studentResponse, 'studentResponse response');
        if (studentResponse?.result?.data?.user === userSession.id) {
          // update local storage session student data
          setSessionUserKeyAgainstValue('school', studentResponse?.result?.data?.school);
          setSessionUserKeyAgainstValue('spot', studentResponse?.result?.data?.spot);
          setSessionUserKeyAgainstValue('idCard', studentResponse?.result?.data?.idCard);
          setSessionUserKeyAgainstValue('branch', studentResponse?.result?.data?.branch);
          setSessionUserKeyAgainstValue('responsableNumber', studentResponse?.result?.data?.responsableNumber);
        }
      }

      notificationWithIcon('success', 'SUCCESS', 'Profile mis à jour!');
      dispatch(reFetchData());
    } catch (err) {
      console.log(err?.response?.data?.result);
      notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => setIsReadOnly(!isReadOnly);

  const renderUpload = () => (
    <Form.Item name='cin' valuePropName='file'>
      <Upload
        listType='picture-card'
        getValueFromEvent={normFile}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
        accept='.jpg,.jpeg,.png,.pdf'
        beforeUpload={() => false}
        fileList={fileList}
        name='images'
        rules={[{ required: true, message: '2 images sont requis!' }]}
        maxCount={5}
        disabled={isReadOnly}
      >
        {fileList.length >= 2 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );

  const openWallet = async () => {
    try {
      const walletRes = await ApiService.post('/create-wallet', userSession, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(walletRes?.result?.data?.wallet, '.. ');
      if (walletRes?.result_code === 0) {
        if (walletRes?.result?.data?._id === userSession.id) {
          setSessionUserKeyAgainstValue('wallet', walletRes?.result?.data?.wallet);
        }
        navigate('/main/client');
        notificationWithIcon('success', 'SUCCESS', 'Maintenant, vous pouvez utiliser votre compte!');
        setLoading(false);
      }
    } catch (errors) {
      const err = errors?.response?.data?.result?.error;
      console.log(err, 'formatpkine');
      if (Object.keys(err).length === 0 && err.constructor === Object) {
        console.log('Error object is empty:', err);
        notificationWithIcon('error', 'ERROR', 'An unknown error occurred.');
      } else if (typeof err === typeof '') {
        console.log(err);
        notificationWithIcon('error', 'ERROR', err || 'Server error');
      } else notificationWithIcon('error', 'ERROR', 'Veuilllez verifier les informations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto sm:p-10 p-0'>
      <div className='bg-gray-50 rounded-[2rem] shadow-lg p-3 sm:p-10'>
        <h1 className='text-3xl md:text-4xl font-bold mb-6'>Modifier le profil</h1>
        {
          !userSession.wallet && (
          <>
            {isProfileComplete ? (
              <Alert
                className='mb-10 hover:cursor-pointer'
                message='Information'
                description='Désormais vous pouvez ouvrir votre portefeuille!'
                type='info'
                onClick={openWallet}
                showIcon
                action={(
                  <Space>
                    <Button type='link' size='small' ghost>
                      Ouvrir
                    </Button>
                  </Space>
                )}
              />
            ) : (
              <p className='text-gray-600 mb-6'>
                Afin d’ouvrir votre
                {' '}
                <b>Porte-feuille</b>
                {' '}
                Bus’nay, veuillez fournir les informations demandées ci-dessous.
              </p>
            )}
          </>
          )
        }
        <Skeleton loading={fetchLoading} paragraph={{ rows: 10 }} active avatar>
          <h2 className='mb-10 text-xl font-bold text-neutral-600 hover:text-neutral-800 dark:text-neutral-200'>
            Profile utilisateur
          </h2>
          <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            {/* Personal Information Fields */}
            {Object.keys(labels).map((field) => (
              <div key={field}>
                <label htmlFor={field} className='block mb-2 text-sm font-medium text-[#111827]'>{labels[field]}</label>
                <Form.Item
                  name={field}
                  rules={[
                    field !== 'email' && { required: true, message: `Veuillez entrer votre ${labels[field].toLowerCase()}` }
                  ].filter(Boolean)}
                >
                  {field === 'birthday' ? (
                    <DatePicker
                      className='w-full'
                      placeholder='Sélectionner la date'
                      format='YYYY-MM-DD'
                      size='large'
                      allowClear
                      disabled={isReadOnly}
                    />
                  ) : field === 'sexe' ? (
                    <Form.Item name='sexe' rules={[{ required: true, message: 'Veuillez sélectionner votre sexe' }]}>
                      <Select placeholder='Sélectionner le sexe' disabled={isReadOnly}>
                        <Select.Option value='male'>Homme</Select.Option>
                        <Select.Option value='female'>Femme</Select.Option>
                      </Select>
                    </Form.Item>
                  ) : (
                    <Input size='large' placeholder={user?.[field] || labels[field]} value={labels[field]} readOnly={field === 'email' || isReadOnly} />
                  )}
                </Form.Item>
              </div>
            ))}

            {/* File Upload for CIN OCR */}
            <div className='col-span-1 md:col-span-2'>
              <label htmlFor='cin' className='block mb-2 text-sm font-medium text-[#111827]'>Image du CIN (recto-verso)</label>
              {((user.identityCard_images.length < 2) || (!isReadOnly && user.identityCard_images.length !== 0)) && renderUpload()}
              {isReadOnly && (
                <div className='col-span-1 md:col-span-2'>
                  {user?.identityCard_images?.map((icImage) => (
                    <Image
                      key={icImage.url} // Assurez-vous que 'url' est unique
                      className='!w-auto !h-[105px] rounded-lg'
                      src={icImage.url}
                      crossOrigin='anonymous'
                      alt='Image de la carte d`identité'
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Conditional Profile Components */}
            {user?.role === 'SOCIETY_ROLE' && (<SocietyProfile readOnly={isReadOnly} />)}
            {user?.role === 'STUDENT_ROLE' && (<StudentProfile readOnly={isReadOnly} />)}

            {/* Toggle Edit/Save Buttons */}
            <div className='col-span-1 md:col-span-2 text-right'>
              {!isReadOnly ? (
                <>
                  <Button type='primary' htmlType='submit' className='bg-orange-500 px-16 py-5 rounded-full mb-2' loading={loading} disabled={loading}>Sauvegarder</Button>
                  <Button type='default' onClick={toggleEdit} className='bg-gray-300 px-16 py-5 rounded-full ml-2'>Annuler</Button>
                </>
              ) : (
                <Button type='default' onClick={toggleEdit} className='bg-gray-300 px-16 py-5 rounded-full'>Modifier</Button>
              )}
            </div>
          </Form>
        </Skeleton>
      </div>
    </div>
  );
}

export default UserProfile;
