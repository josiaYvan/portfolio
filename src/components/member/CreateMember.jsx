/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  UserOutlined, PhoneOutlined, CalendarOutlined
} from '@ant-design/icons';
import {
  Button, Card, Form, Input, Select
} from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import { getSessionUser } from '../../utils/authentication';

function CreateMember() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = getSessionUser();

  const [sexe] = useState([
    { value: 'male', label: 'Homme' },
    { value: 'female', label: 'Femme' }
  ]);

  const onFinish = (values) => {
    setLoading(true);
    const userFormData = new FormData();
    userFormData.append('group', user.nif);
    Object.keys(values).forEach((key) => userFormData.append(key, values[key]));

    ApiService.post('/create-user-for-group', userFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((response) => {
        setLoading(false);
        if (response?.result_code === 0) {
          notificationWithIcon('success', 'Succès', response?.result?.message || 'Nouvel utilisateur enregistré avec succès');
          form.resetFields();
          dispatch(reFetchData());
        } else {
          notificationWithIcon('error', 'Erreur', "Désolé ! Une erreur s'est produite.");
        }
      })
      .catch((err) => {
        setLoading(false);
        notificationWithIcon('error', err?.response?.data?.result?.title, err?.response?.data?.result?.error);
      });
  };

  return (
    <Form
      form={form}
      name='create-new-user'
      onFinish={onFinish}
    >
      <Card className='mx-auto'>

        {/* Informations personnelles */}
        <div className='two-grid-column'>
          <Form.Item
            className='w-full md:w-1/3'
            label='Nom'
            name='name'
            rules={[{ required: true, message: 'Veuillez entrer le nom !' }]}
          >
            <Input
              allowClear
              prefix={<UserOutlined />}
              placeholder='Nom'
              size='large'
            />
          </Form.Item>

          <Form.Item
            className='w-full md:w-1/3'
            label='Prénom'
            name='firstname'
            rules={[{ required: true, message: 'Veuillez entrer le prénom !' }]}
          >
            <Input
              allowClear
              prefix={<UserOutlined />}
              placeholder='Prénom'
              size='large'
            />
          </Form.Item>
        </div>

        {/* Coordonnées */}
        <div className='two-grid-column'>
          <Form.Item
            className='w-full md:w-1/3'
            label='Email'
            name='email'
            rules={[{ required: true, type: 'email', message: 'Veuillez entrer un email valide !' }]}
          >
            <Input
              allowClear
              placeholder='Email'
              size='large'
            />
          </Form.Item>

          <Form.Item
            className='w-full md:w-1/3'
            label='Téléphone'
            name='phone'
            rules={[{ required: true, message: 'Veuillez entrer le numéro de téléphone !' }]}
          >
            <Input
              allowClear
              prefix={<PhoneOutlined />}
              placeholder='Téléphone'
              size='large'
            />
          </Form.Item>
        </div>

        {/* Adresse */}
        <div className='two-grid-column'>
          <Form.Item
            className='w-full md:w-1/3'
            label='Adresse'
            name='address'
            rules={[{ required: true, message: 'Veuillez entrer l’adresse !' }]}
          >
            <Input
              allowClear
              placeholder='Adresse'
              size='large'
            />
          </Form.Item>

          <Form.Item
            className='w-full md:w-1/3'
            label='Quartier'
            name='district'
            rules={[{ required: true, message: 'Veuillez entrer le quartier !' }]}
          >
            <Input
              allowClear
              placeholder='Quartier'
              size='large'
            />
          </Form.Item>
        </div>
        <div className='two-grid-column'>
          <Form.Item
            className='w-full md:w-1/3'
            label='Sexe'
            name='sexe'
            rules={[{ required: true, message: 'Veuillez sélectionner le sexe !' }]}
          >
            <Select
              allowClear
              placeholder='-- Sélectionner le sexe --'
              options={sexe}
              size='large'
            />
          </Form.Item>
          <Form.Item
            className='w-full md:w-1/3'
            label='Date de naissance'
            name='birthday'
            rules={[{ required: true, message: 'Veuillez entrer la date de naissance !' }]}
          >
            <Input
              allowClear
              prefix={<CalendarOutlined />}
              placeholder='Date de naissance'
              size='large'
              type='date'
            />
          </Form.Item>
        </div>

        {/* Autres informations */}
        <div className='two-grid-column'>
          <Form.Item
            className='w-full md:w-1/3'
            label='Poste'
            name='occupation'
            rules={[{
              required: true,
              message: 'Please input your poste!'
            }]}
          >
            <Input
              placeholder='Travaille en tant que ...'
              size='large'
              type='text'
              allowClear
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            size='large'
          >
            Valider
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
}

export default CreateMember;
