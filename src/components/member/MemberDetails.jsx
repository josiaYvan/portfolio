/* eslint-disable no-unused-vars */
import { ExclamationCircleFilled } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Descriptions, Image, Modal, Result, Skeleton, Tag
} from 'antd';

import useFetchData from '../../hooks/useFetchData';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import { getRoleResponse } from '../../utils/responseAsStatus';

const { confirm } = Modal;

function MemberDetails({ id }) {
  const dispatch = useDispatch();
  const [loading, error, response] = useFetchData(`/get-user/${id}`);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (response?.data) {
      console.log('line:25 response?.data\n---> ', response?.data);
      const { role } = response.data;
      const fetchProfileData = async () => {
        try {
          const endpoint = role === 'SOCIETY_ROLE' ? 'society' : 'student';
          const res = await ApiService.get(`/get-${endpoint}-by-user-id/${id}`);
          setProfileData(res?.result?.data);
        } catch (err) {
          console.log('error', 'ERROR', 'Failed to fetch Profile data.');
        }
      };

      fetchProfileData();
    }
  }, [response, id]);

  const deleteUser = () => {
    confirm({
      title: 'Retirer',
      icon: <ExclamationCircleFilled />,
      content: 'Êtes-vous sûr de vouloir retirer ce membre ?',
      async onOk() {
        try {
          const res = await ApiService.delete(`/delete-user/${response?.data.id}`);
          if (res?.result_code === 0) {
            notificationWithIcon('success', 'SUCCESS', 'Membre retiré avec succés');
            dispatch(reFetchData());
          } else {
            notificationWithIcon('error', 'Erreur du serveur', 'Veuillez réessayer!');
          }
        } catch (err) {
          notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || 'Sorry! Something went wrong. App server error');
        }
      }
    });
  };

  return (
    <>
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
        {error ? (
          <Result title='Échec de la récupération' subTitle='Impossible de charger cette page!' status='error' />
        ) : (
          <>
            <Descriptions
              title='Profile Utilisateur'
              bordered
              extra={(
                <Button onClick={deleteUser} type='default' danger>
                  Retirer du groupe
                </Button>
              )}
            >
              <Descriptions.Item label='Nom' className='font-semibold'>
                {response?.data?.name}
              </Descriptions.Item>
              <Descriptions.Item label='Prénom' className='font-semibold' span={2}>
                {response?.data?.firstname}
              </Descriptions.Item>
              <Descriptions.Item label='Email' className='font-semibold'>
                {response?.data?.email}
              </Descriptions.Item>
              <Descriptions.Item label='Téléphone' className='font-semibold' span={2}>
                {response?.data?.phone}
              </Descriptions.Item>

              <Descriptions.Item label='Sexe'>
                <Tag
                  className='w-[70px] text-center uppercase'
                  color={response?.data?.sexe === 'male' ? 'cyan-inverse' : response?.data?.sexe === 'female' ? 'magenta-inverse' : 'default'}
                >
                  {response?.data?.sexe === 'male' ? 'Homme' : response?.data?.sexe === 'female' ? 'Femme' : 'Indefini'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Poste de travail' className='font-semibold' span={2}>
                {response?.data?.occupation}
              </Descriptions.Item>
              <Descriptions.Item label='Adresse' className='font-semibold' span={2}>
                {response?.data?.address}
              </Descriptions.Item>
              <Descriptions.Item label='District' className='font-semibold' span={2}>
                {response?.data?.district}
              </Descriptions.Item>
              <Descriptions.Item label='Date de naissance' className='font-semibold' span={2}>
                {response?.data?.birthday}
              </Descriptions.Item>

              <Descriptions.Item label='Date de création de compte' className='font-semibold' span={2}>
                {response?.data?.createdAt?.split('T')[0]}
              </Descriptions.Item>
            </Descriptions>
            {(response?.data?.role === 'STUDENT_ROLE' || response?.data?.role === 'SOCIETY_ROLE') && (
            <Descriptions
              title={response?.data?.role === 'STUDENT_ROLE' ? 'Profile Étudiant' : 'Profile Société'}
              bordered
              className='mt-10'
            >
              {profileData && (response?.data?.role === 'SOCIETY_ROLE') && (
                <>
                  <Descriptions.Item label='Nom de société' className='font-bold' span={2}>
                    {profileData.name}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Email de société' className='font-bold' span={2}>
                    {profileData.email}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Téléphone de société' className='font-bold' span={2}>
                    {profileData.numero}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Adresse de société' className='font-bold' span={2}>
                    {profileData.spot}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='NIF de société' className='font-bold' span={2}>
                    {profileData.nif}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='STAT de société' className='font-bold' span={2}>
                    {profileData.stat}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Activité' className='font-bold' span={2}>
                    {profileData.activity}
                    {' '}
                  </Descriptions.Item>
                </>
              )}
              {profileData && (response?.data?.role === 'STUDENT_ROLE') && (
                <>
                  <Descriptions.Item label='Nom de l`école' className='font-bold' span={2}>
                    {profileData.school}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Adresse de l`école' className='font-bold' span={2}>
                    {profileData.spot}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Numéro carte étudiant' className='font-bold' span={2}>
                    {profileData.idCard}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Filière' className='font-bold' span={2}>
                    {profileData.branch}
                    {' '}
                  </Descriptions.Item>
                  <Descriptions.Item label='Numéro du responsable' className='font-bold' span={2}>
                    {profileData.responsableNumber}
                    {' '}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>
            )}
          </>
        )}
      </Skeleton>

      {/* {editProfileModal && (
        <ProfileEditModal
          editProfileModal={editProfileModal}
          setEditProfileModal={setEditProfileModal}
          user={response?.data}
        />
      )} */}
    </>
  );
}

export default React.memo(MemberDetails);
