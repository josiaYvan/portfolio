/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import {
  Table, Modal, Skeleton, Result,
  Badge
} from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { formatDateInEnglishWithHour } from '../../utils/format';
import ApiService from '../../utils/apiService';
import notificationWithIcon from '../../utils/notification';
import { useSocketContext } from '../../context/SocketContext';
import { getSessionUser } from '../../utils/authentication';
import { reFetchData } from '../../store/slice/appSlice';

function Courier() {
  const {
    notifications, loading, error
  } = useSocketContext();
  const userId = getSessionUser().id;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewNotif, setViewNotif] = useState(null);

  const handleRowClick = async (record) => {
    setViewNotif(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt, record) => (
        <>
          {record.toUsers.some((user) => user.tag === 'new') && <Badge status='processing' style={{ marginRight: 8 }} />}
          {formatDateInEnglishWithHour(createdAt)}
        </>
      )
    },
    {
      title: 'Sujet',
      dataIndex: 'subject',
      key: 'subject'
    },
    {
      title: 'Titre',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message'
    }
  ];

  return (
    <div className='container bg-gray-50 mx-auto p-6 xl:p-10'>
      <h1 className='float-left text-3xl md:text-4xl font-bold'>
        Mes
        {' '}
        <span className='text-3xl md:text-4xl text-[#4B9A90] font-bold'>courriers</span>
      </h1>
      <div className='mt-20'>
        <Skeleton loading={loading} active>
          {error ? (
            <Result title='Échec de la récupération' subTitle='Impossible de charger cette page!' status='error' />
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={notifications}
                rowKey='_id'
                scroll={{ x: 700 }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                  style: record.toUsers.some((user) => user.tag === 'new') ? { fontWeight: 'bold' } : {}
                })}
              />
              <Modal
                title={viewNotif?.subject || 'Notification'}
                open={isModalVisible}
                onCancel={async () => {
                  if (viewNotif) {
                    try {
                      await ApiService.put(`/see-notification/${viewNotif._id}`, { userId });
                      dispatch(reFetchData());
                    } catch (error) {
                      notificationWithIcon('warning', 'Info', 'Ce courrier a été supprimé!');
                      dispatch(reFetchData());
                    }
                  }
                  setIsModalVisible(false);
                }}
                footer={null}
              >
                {viewNotif && (
                <div>
                  <p className='text-gray-500 mb-5 text-sm'>{formatDateInEnglishWithHour(viewNotif.createdAt)}</p>
                  <div style={{
                    maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px'
                  }}
                  >
                    <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
                      <h4 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
                        {viewNotif.title}
                      </h4>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.6 }}>
                        {viewNotif.message}
                      </p>
                    </div>
                    <div style={{
                      padding: '20px', textAlign: 'center', fontSize: '14px', color: '#888'
                    }}
                    >
                      <p className='absolute b-0 mx-[16%]' style={{ fontSize: 10 }}>
                        {process.env.REACT_APP_COPY_RIGHT}
                      </p>
                    </div>
                  </div>
                </div>
                )}
              </Modal>
            </>
          )}
        </Skeleton>
      </div>
    </div>
  );
}

export default React.memo(Courier);
