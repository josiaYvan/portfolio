import React from 'react';
import { Card, Table } from 'antd';

// Exemple de données de transaction
const data = [
  {
    key: '1',
    solde: '5.000 Ariary',
    nouveauSolde: '15.000 Ariary',
    action: 'Recharge',
    debitCredit: '+ 10.000 Ariary',
    date: '17 Octobre 2024'
  }
  // Ajoutez d'autres lignes si nécessaire
];

// Colonnes du tableau des transactions
const columns = [
  {
    title: 'Solde',
    dataIndex: 'solde',
    key: 'solde'
  },
  {
    title: 'Nouveau solde',
    dataIndex: 'nouveauSolde',
    key: 'nouveauSolde'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  },
  {
    title: 'Débit/Crédit',
    dataIndex: 'debitCredit',
    key: 'debitCredit'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  }
];

function TransactionHistory() {
  return (
    <Card className='rounded-[2rem] mt-20 p-4 shadow-sm'>
      <h1 className='font-bold text-[13px] md:text-lg mb-6'>HISTORIQUE DES TRANSACTIONS</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 700 }}
        sticky={{ offsetHeader: 0 }}
        className='data-table'
        rowClassName='data-table-body-tr'
      />
    </Card>
  );
}

export default TransactionHistory;
