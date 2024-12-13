/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Result, Skeleton } from 'antd';
import useFetchData from '../../hooks/useFetchData';
import UserProfile from '../profile/UserProfile';
import { checkProfileCompletion } from '../../utils/funtcion';

function EditProfile() {
  const [loading, error, response] = useFetchData('/get-user');
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    if (response?.data) {
      setIsProfileComplete(checkProfileCompletion(response?.data));
    }
  }, [response]);

  return (
    <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
      {error ? (
        <Result title='Échec de la récupération' subTitle='Impossible de charge cette page!' status='error' />
      ) : (
        <UserProfile user={response?.data} isProfileComplete={isProfileComplete} />
      )}
    </Skeleton>
  );
}

export default EditProfile;
