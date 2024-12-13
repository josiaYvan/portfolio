import React, { useState } from 'react';
import {
  Upload, Button, Table, message, Spin,
  Tag
} from 'antd';
import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ApiService from '../../utils/apiService';
import { getSessionUser } from '../../utils/authentication';
import { reFetchData } from '../../store/slice/appSlice';
import notificationWithIcon from '../../utils/notification';

function UploadMemberFromExcel() {
  const [createdMember, setCreatedMember] = useState([]);
  const [failedMember, setFailedMember] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getSessionUser();
  const dispatch = useDispatch();

  const demoFile = 'http://localhost:8000/demo.xlsx';

  const handleUpload = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('file', file);

    try {
      await ApiService.post('/create-user-from-excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        if (response?.result_code === 0) {
          const { createdUsers, failedUsers } = response?.result?.data?.details;
          setCreatedMember(createdUsers);
          setFailedMember(failedUsers);
          response?.result?.data?.created !== 0 && message.success('Fichier traité avec succès!');
        }
        dispatch(reFetchData());
      }).catch((err) => {
        notificationWithIcon('error', err?.response?.data?.result?.title, `: ${err?.response?.data?.result?.error?.missingHeaders.map((element) => `"${element}"`).join(' -')}`, 60);
      });
    } catch (error) {
      console.log('line:45 error\n---> ', error?.data?.result);
      message.error('Erreur lors du téléchargement ou traitement du fichier. Erreur du serveur!');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Nom', dataIndex: 'name', key: 'name' },
    { title: 'Prénom', dataIndex: 'firstname', key: 'firstname' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Statut',
      key: 'status',
      render: (_, record) => (
        <span>{record.error ? <Tag color='red'>Échoué</Tag> : <Tag color='green'>Créé</Tag> }</span>
      )
    },
    {
      title: 'Erreur',
      key: 'error',
      render: (_, record) => (
        <span className='text-red-500'>
          {record.error && typeof record.error === 'string' ? record.error : <Tag color='green'>OK</Tag>}
        </span>
      )
    }
  ];

  return (
    <div>
      <h1 className='font-bold text-[13px] md:text-lg mb-6'>Importez un fichier Excel pour ajouter plusieurs membres</h1>
      <span>
        Télécharger
        <Button href={demoFile} download icon={<DownloadOutlined />} size='small' type='link'>
          le fichier de démonstration
        </Button>
        , puis modifier celui-ci pour ajouter les nouveaux membres
      </span>
      <div className='mt-3'>
        <Upload
          accept='.xlsx'
          customRequest={({ file }) => handleUpload(file)}
          showUploadList={false}
          listType='picture-card'
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Importer</div>
          </div>
        </Upload>
      </div>

      {loading && <Spin size='large' tip='Chargement du fichier...' />}

      <div className='mt-2'>
        <h1 className='font-semibold underline'>Résultat de la création</h1>
        <Table
          dataSource={[
            ...createdMember,
            ...failedMember.map((f) => ({ ...f.data, error: f.error || 'Erreur inconnue' }))
          ]}
          columns={columns}
          rowKey='email'
          pagination={false}
          scroll={{ x: 700 }}
        />
      </div>

      <p className='text-gray-500'>
        * Veuillez assurer la validité des informations pour chaque membre.
        <br />
        * Assurez-vous que le fichier contient toutes les colonnes nécessaires. Les erreurs s&#39;afficheront pour chaque membre échoué.
      </p>
    </div>
  );
}

export default UploadMemberFromExcel;
