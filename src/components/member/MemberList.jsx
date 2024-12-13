/**
 * @name Busnay
 * @author Mr. Josia Yvan
 * @description System API and Management System Software ~ Developed By Mr. Josia Yvan
 * @copyright ©2024 ― Mr. Josia Yvan. All rights reserved.
 * @version v0.0.1
 *
 */
import {
  Button, Empty, Result, Skeleton, Table, Tag
} from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uniqueId } from 'uuid';
import useFetchData from '../../hooks/useFetchData';
import QueryOptions from '../shared/QueryOptions';
import UserStatusUpdateModal from '../shared/UserStatusUpdateModal';
import { getSexeResponse } from '../../utils/responseAsStatus';
import { getSessionUser } from '../../utils/authentication';

function MemberList({ add }) {
  const [fetchAgain, setFetchAgain] = useState(false);
  const user = getSessionUser();
  const [query, setQuery] = useState({
    search: '', sort: 'ascend', page: 1, rows: 10
  });
  const [statusUpdateModal, setStatusUpdateModal] = useState(
    { open: false, id: null, status: null }
  );

  // fetch user-list API data
  const [loading, error, response] = useFetchData(`/all-group-user/${user.id}?keyword=${query.search}&limit=${query.rows}&page=${query.page}&sort=${query.sort}`, fetchAgain);

  useEffect(() => {
    setQuery((prevState) => ({ ...prevState, page: 1 }));
  }, [query.rows, query.search]);

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Prénom',
      dataIndex: 'firstname',
      key: 'firstname'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Adresse',
      dataIndex: 'district',
      key: 'district'
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Poste de travail',
      dataIndex: 'occupation',
      key: 'occupation'
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      render: (sexe) => (
        <Tag color={getSexeResponse(sexe).color}>
          {getSexeResponse(sexe).label.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type='link' onClick={() => add(record.id)}>
          View
        </Button>
      )
    }
  ];

  return (
    <div>
      {/* Query options */}
      <QueryOptions query={query} setQuery={setQuery} />

      {/* Content section */}
      {error ? (
        <Result title='Erreur de recupération' subTitle={error} status='error' />
      ) : (
        <Skeleton loading={loading} paragraph={{ rows: 10 }} active>
          <Table
            scroll={{ x: 700 }}
            columns={columns}
            dataSource={response?.data?.rows || []}
            rowKey={() => uniqueId()}
            pagination={{
              total: response?.data?.total_page * 10,
              current: query.page,
              pageSize: query.rows,
              onChange: (page) => setQuery((prevState) => ({ ...prevState, page }))
            }}
            locale={{ emptyText: <Empty description='Aucun membre n&#39;a été trouvé!' /> }}
          />
        </Skeleton>
      )}

      {/* Status update modal */}
      {statusUpdateModal?.open && (
        <UserStatusUpdateModal
          statusUpdateModal={statusUpdateModal}
          setStatusUpdateModal={setStatusUpdateModal}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
}

export default React.memo(MemberList);
