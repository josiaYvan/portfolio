import {
  Result, Skeleton, Button
} from 'antd';
import { v4 as uniqueId } from 'uuid';
import { ReloadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';

function Logger() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, error, response] = useFetchData('/log', fetchAgain);

  const handleFetch = () => {
    setFetchAgain(true);
    setTimeout(() => {
      setFetchAgain(false);
    }, 200);
  };

  const logsData = response?.data?.logs.map((log) => ({
    key: uniqueId(),
    log
  })) || [];

  return (
    <Skeleton loading={loading} active>
      {error ? (
        <Result title='Échec de la récupération' subTitle='Impossible de charge cette page!' status='error' />
      ) : (
        <>
          <Button
            icon={<ReloadOutlined />}
            onClick={handleFetch}
            style={{ marginBottom: '16px' }}
          >
            Refresh Logs
          </Button>
          <div className='table-layout'>
            <div className='table-layout-container'>
              <table className='data-table'>
                <thead className='data-table-head'>
                  <tr className='data-table-head-tr'>
                    <th className='data-table-head-tr-th' scope='col'>
                      Journal des actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logsData.length > 0 ? (
                    logsData.map((data) => (
                      <tr className='data-table-body-tr' key={data.key}>
                        <td className='data-table-body-tr-td'>
                          {data.log}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='data-table-body-tr-td text-center'>
                        No logs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Skeleton>
  );
}

export default React.memo(Logger);
