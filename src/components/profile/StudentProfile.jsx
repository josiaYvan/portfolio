/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Form, Input
} from 'antd';
import React from 'react';

function StudentProfile({ readOnly }) {
  return (
    <>
      <h2 className='mb-2.5 text-xl font-bold text-neutral-600 hover:text-neutral-800 dark:text-neutral-200'>
        Profile étudiant
      </h2>
      <span />
      <div>
        <label htmlFor='school' className='block mb-2 text-sm font-medium text-[#111827]'>Etablissement</label>
        <Form.Item name='school' rules={[{ required: true, message: 'Veuillez entrer le nom de votre école!' }]}>
          <Input id='school' size='large' readOnly={readOnly} placeholder='Le nom de votre école' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='spot' className='block mb-2 text-sm font-medium text-[#111827]'>Adresse de l&apos;école</label>
        <Form.Item name='spot' rules={[{ required: true, message: 'Veuillez entrer l&apos;adresse de votre école!' }]}>
          <Input id='spot' size='large' readOnly={readOnly} placeholder='L`adresse de votre école' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='idCard' className='block mb-2 text-sm font-medium text-[#111827]'>Numéro de votre carte étudiant</label>
        <Form.Item name='idCard' rules={[{ required: true, message: 'Veuillez entrer le numéro de votre carte étudiant!' }]}>
          <Input id='idCard' size='large' readOnly={readOnly} placeholder='Le numéro de votre carte étudiant' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='branch' className='block mb-2 text-sm font-medium text-[#111827]'>Filière</label>
        <Form.Item name='branch' rules={[{ required: true, message: 'Veuillez entrer votre filière!' }]}>
          <Input id='branch' size='large' readOnly={readOnly} placeholder='Votre filière' />
        </Form.Item>
      </div>

      <div>
        <label htmlFor='responsableNumber' className='block mb-2 text-sm font-medium text-[#111827]'>Téléphone de votre responsable</label>
        <Form.Item name='responsableNumber' rules={[{ required: true, message: 'Veuillez entrer le numéro téléphone de votre responsable!' }]}>
          <Input id='responsableNumber' size='large' readOnly={readOnly} placeholder='Le numéro téléphone de votre responsable' />
        </Form.Item>
      </div>
    </>

  );
}

export default StudentProfile;
