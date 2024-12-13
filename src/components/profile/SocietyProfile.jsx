/* eslint-disable jsx-a11y/label-has-associated-control */
import { Form, Input } from 'antd';
import React from 'react';

function SocietyProfile({ readOnly }) {
  return (
    <>
      <h2 className='mb-2.5 text-xl font-bold text-neutral-600 hover:text-neutral-800 dark:text-neutral-200'>
        Profile entreprise
      </h2>
      <span />

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>Nom société</label>
        <Form.Item name='society_name' rules={[{ required: true, message: 'Veuillez entrer le nom de votre société!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='Nom de votre société' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>Email société</label>
        <Form.Item name='society_email' rules={[{ required: true, message: 'Veuillez entrer le mail de votre société!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='Email de votre société' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>Numero société</label>
        <Form.Item name='society_numero' rules={[{ required: true, message: 'Veuillez entrer le numero de votre société!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='Numero de votre société' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>Adresse société</label>
        <Form.Item name='society_spot' rules={[{ required: true, message: 'Veuillez entrer l\'adresse de votre société!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='Adresse de votre société' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>NIF société</label>
        <Form.Item name='society_nif' rules={[{ required: true, message: 'Veuillez entrer le Numéro d\'identification fiscale!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='NIF de votre société' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>STAT société</label>
        <Form.Item name='society_stat' rules={[{ required: true, message: 'Veuillez entrer le Numéro Statistique!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='STAT de votre société' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='confirm' className='society_block mb-2 text-sm font-medium text-[#111827]'>Activité société</label>
        <Form.Item name='society_activity' rules={[{ required: true, message: 'Veuillez entrer l\'activité de votre société!' }]}>
          <Input size='large' readOnly={readOnly} placeholder='Activité de votre société' />
        </Form.Item>
      </div>
    </>
  );
}

export default SocietyProfile;
