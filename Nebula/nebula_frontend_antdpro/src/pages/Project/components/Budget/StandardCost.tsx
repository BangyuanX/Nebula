import React from 'react';
import { Table, Statistic } from 'antd';

import styles from './styles.less';

const columns = [
  {
    title: 'WEWORK STANDARD COST',
    dataIndex: 'category',
    width: 300,
  },
  {
    title: 'TOTAL COST',
    dataIndex: 'total',
    align: 'right',
    render: (num: number) => (
      <Statistic
        className={styles.statVarPer}
        value={num ? num * 100 : '--'}
        prefix="$"
        precision={2}
      />
    ),
    width: 200,
  },
  {
    title: '%',
    dataIndex: 'per',
    align: 'right',
    render: (per: number) => (
      <Statistic className={styles.statVarPer} value={per ? per * 100 : '--'} suffix="%" />
    ),
    width: 175,
  },
  {
    title: 'COST / USF',
    dataIndex: 'costPerUSF',
    align: 'right',
    render: (num: number) => (
      <Statistic
        className={styles.statVarPer}
        value={num ? num * 100 : '--'}
        prefix="$"
        precision={2}
      />
    ),
  },
  {
    title: 'COST / DESK',
    dataIndex: 'costPerDesk',
    align: 'right',
    render: (num: number) => (
      <Statistic
        className={styles.statVarPer}
        value={num ? num * 100 : '--'}
        prefix="$"
        precision={2}
      />
    ),
  },
];

const data = [
  {
    key: '1',
    category: 'Soft',
    total: 31884.5,
    per: 0.01,
    costPerUSF: 0.32,
    costPerDesk: 18.1,
  },
  {
    key: '2',
    category: 'Hard',
    total: 4342972.26,
    per: 0.76,
    costPerUSF: 43.09,
    costPerDesk: 2464.8,
  },
  {
    key: '3',
    category: 'General',
    total: 59913.2,
    per: 0.01,
    costPerUSF: 0.59,
    costPerDesk: 34.0,
  },
  {
    key: '4',
    category: 'Direct',
    total: 1260338.16,
    per: 0.22,
    costPerUSF: 12.5,
    costPerDesk: 715.29,
  },
];

const StandardCost: React.FC = () => {
  return (
    <Table
      // @ts-ignore
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
      className={styles.budget}
    />
  );
};

export default StandardCost;
