import React from 'react';
import { Table, Statistic } from 'antd';

import styles from './styles.less';

const columns = [
  {
    title: 'BUDGET VS PRO FORMA',
    dataIndex: 'category',
    width: 300,
  },
  {
    title: 'PRO FORMA',
    dataIndex: 'proforma',
    align: 'right',
    width: 200,
  },
  {
    title: 'BUDGET',
    dataIndex: 'budget',
    align: 'right',
    width: 175,
  },
  {
    title: 'VAR (#)',
    dataIndex: 'variance',
    align: 'right',
  },
  {
    title: 'VAR (%)',
    dataIndex: 'variancePer',
    align: 'right',
    render: (variancePer) => (
      <Statistic
        className={styles.statVarPer}
        value={variancePer ? variancePer * 100 : '--'}
        suffix="%"
      />
    ),
  },
];

const data = [
  {
    key: '1',
    category: 'USF',
    proforma: 100800,
    budget: 100800,
    variance: 0,
    variancePer: 0,
  },
  {
    key: '2',
    category: 'Desks',
    proforma: 1778,
    budget: 1762,
    variance: 16,
    variancePer: -0.01,
  },
  {
    key: '3',
    category: 'USF / Desk',
    proforma: 56.69,
    budget: 57.21,
    variance: 0.51,
    variancePer: 0.01,
  },
  {
    key: '4',
    category: 'Cost / Desk',
    proforma: 3588.66,
    budget: 3612.48,
    variance: 32.82,
    variancePer: 0.01,
  },
  {
    key: '5',
    category: 'Total Cost',
    proforma: 6380629.0,
    budget: 6381042.13,
    variance: 413.13,
    variancePer: 0,
  },
  {
    key: '6',
    category: 'Ti Allowance',
    proforma: 0,
    budget: 0,
    variance: 0,
    variancePer: 0,
  },
  {
    key: '7',
    category: 'Total Out of Pocket',
    proforma: 6380629.0,
    budget: 6381042.13,
    variance: null,
    variancePer: null,
  },
];

function BudgetProforma() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      className={styles.budget}
    />
  );
}

export default BudgetProforma;
