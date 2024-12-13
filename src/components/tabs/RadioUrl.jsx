import React, { useEffect, useState } from 'react';
import {
  Button, Empty, Modal, Result, Skeleton, Tag
} from 'antd';
import { v4 as uuid } from 'uuid';
import { AppstoreAddOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import useFetchData from '../../hooks/useFetchData';
import { radioTypeAsResponse } from '../../utils/responseAsStatus';
import RadioUpdateModal from '../shared/RadioUpdateModal';
import RadioCreateModal from '../shared/RadioCreateModal';
import notificationWithIcon from '../../utils/notification';
import { reFetchData } from '../../store/slice/appSlice';
import ApiService from '../../utils/apiService'; // Assurez-vous d'importer ApiService

const { confirm } = Modal;

function RadioUrl() {
  const dispatch = useDispatch();
  const [fetchAgain, setFetchAgain] = useState(false);
  const [query, setQuery] = useState({
    search: '',
    sort: 'desc',
    page: 1,
    rows: 10
  });
  const [statusUpdateModal, setStatusUpdateModal] = useState({ open: false, id: null, status: null });
  const [radioCreateModal, setRadioCreateModal] = useState({ open: false, id: null, status: null });

  // fetch booking-list API data
  const [loading, error, response] = useFetchData(`/radio/all?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`, fetchAgain);

  // reset query options
  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: 1 }));
  }, [query.rows, query.search]);

  // Function to handle deleting a radio
  const deleteUser = (id) => {
    confirm({
      title: 'DELETE RADIO',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure you want to DELETE this radio ?',
      onOk() {
        return new Promise((resolve, reject) => {
          ApiService.delete(`/radio/${id}`)
            .then((res) => {
              if (res?.result_code === 0) {
                notificationWithIcon('success', 'SUCCESS', res?.result?.message || 'Radio deleted successfully');
                dispatch(reFetchData());
                resolve();
              } else {
                notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
                reject();
              }
            })
            .catch((err) => {
              notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
              reject();
            });
        }).catch(() => notificationWithIcon('error', 'ERROR', 'Oops, errors occurred!'));
      }
    });
  };

  return (
    <div>
      <div className='w-full flex flex-row flex-wrap items-center justify-center gap-2'>
        {error ? (
          <Result title='Échec de la récupération' subTitle='Impossible de charge cette page!' status='error' />
        ) : (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
            {response?.data?.rows?.length === 0 ? (
              <Empty className='mt-10' description={<span>Sorry! Any data was not found.</span>} />
            ) : (
              <div className='table-layout'>
                <Button
                  className='inline-flex items-center'
                  icon={<AppstoreAddOutlined />}
                  onClick={() => setRadioCreateModal((prevState) => ({
                    ...prevState, open: true
                  }))}
                  type='primary'
                  size='large'
                >
                  Add radio URL
                </Button>
                <br />
                <br />
                <div className='table-layout-container'>
                  <table className='data-table'>
                    <thead className='data-table-head'>
                      <tr className='data-table-head-tr'>
                        <th className='data-table-head-tr-th' scope='col'>
                          Link
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Type
                        </th>
                        <th className='data-table-head-tr-th text-center' scope='col'>
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {response?.data?.rows?.map((data) => (
                        <tr className='data-table-body-tr' key={uuid()}>
                          <td className='data-table-body-tr-td'><a href={data?.link}>{data?.link}</a></td>
                          <td className='data-table-body-tr-td text-center'>
                            <Tag className='w-[100px] text-center uppercase' color={radioTypeAsResponse(data?.type).color}>
                              {radioTypeAsResponse(data?.type).level}
                            </Tag>
                          </td>
                          <td className='data-table-body-tr-td !px-0 text-center'>
                            <Button
                              className='inline-flex items-center !px-2'
                              type='primary'
                              onClick={() => setStatusUpdateModal((prevState) => ({
                                ...prevState, open: true, id: data?.id, status: data?.type, link: data?.link
                              }))}
                            >
                              Update
                            </Button>
                            <Button
                              className='inline-flex items-center !px-2'
                              type='link'
                              onClick={() => deleteUser(data?.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Skeleton>
        )}
      </div>
      {statusUpdateModal?.open && (
        <RadioUpdateModal
          statusUpdateModal={statusUpdateModal}
          setStatusUpdateModal={setStatusUpdateModal}
          setFetchAgain={setFetchAgain}
        />
      )}
      {radioCreateModal?.open && (
        <RadioCreateModal
          statusUpdateModal={radioCreateModal}
          setStatusUpdateModal={setRadioCreateModal}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default RadioUrl;
