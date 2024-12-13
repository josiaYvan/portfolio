import React from 'react';
import { Card, Table } from 'antd';

const data = [
  {
    key: '1',
    label: 'Point de départ',
    value: '-- xx --'
  },
  {
    key: '2',
    label: 'Destination',
    value: '-- xx --'
  },
  {
    key: '3',
    label: 'Nombre de places réservées',
    value: '-- xx --'
  },
  {
    key: '4',
    label: 'Nombre de places libres',
    value: '-- xx --'
  }
];

const columns = [
  {
    title: 'Information',
    dataIndex: 'label',
    key: 'label'
  },
  {
    title: 'Détails',
    dataIndex: 'value',
    key: 'value'
  }
];

function InfoBusTable() {
  return (
    <Card className='mt-4 bg-white shadow-md rounded-2xl'>
      <Table dataSource={data} columns={columns} pagination={false} />
    </Card>
  );
}

export default InfoBusTable;
