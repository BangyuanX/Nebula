import React from 'react';
import { Row, Col, Card, Select, Typography, Statistic } from 'antd';
import { Link } from 'umi';

import BudgetProforma from './BudgetProforma';
import StandardCost from './StandardCost';

import styles from './styles.less';

const BudgetSelect = () => {
  return (
    <Select defaultValue="1" style={{ width: 350 }}>
      <Select.Option value="1">September 20, 2018 at 5:10 pm by Elaine Ye</Select.Option>
      <Select.Option value="2">September 20, 2018 at 5:10 pm by Elaine Ye</Select.Option>
    </Select>
  );
};

const Budget: React.FC = () => {
  return (
    <Row gutter={24}>
      <Col span={18}>
        <Card bordered={false}>
          <div className={styles.topLine}>
            <BudgetSelect />
            <Link to="#">
              <Typography.Text underline className={styles.exportButton}>
                Export PDF
              </Typography.Text>
            </Link>
          </div>
          <Row style={{ padding: '20px 5px' }}>
            <Col span={6}>
              <Row>
                <Typography.Text type="secondary" className={styles.metricLabel}>
                  COST / USF
                </Typography.Text>
              </Row>
              <Row>
                <Statistic
                  className={styles.stat}
                  value={63}
                  prefix="$"
                  valueStyle={{ color: '#FF7303' }}
                />
              </Row>
            </Col>
            <Col span={6}>
              <Row>
                <Typography.Text type="secondary" className={styles.metricLabel}>
                  USF / DESK
                </Typography.Text>
              </Row>
              <Row>
                <Statistic className={styles.stat} value={57} valueStyle={{ color: '#FF7303' }} />
              </Row>{' '}
            </Col>
            <Col span={6}>
              <Row>
                <Typography.Text type="secondary" className={styles.metricLabel}>
                  COST / DESK
                </Typography.Text>
              </Row>
              <Row>
                <Statistic
                  className={styles.stat}
                  value={3621}
                  prefix="$"
                  valueStyle={{ color: '#FF7303' }}
                />
              </Row>
            </Col>
            <Col span={6}>
              <Row>
                <Typography.Text type="secondary" className={styles.metricLabel}>
                  TI / TOTAL
                </Typography.Text>
              </Row>
              <Row>
                <Statistic
                  className={styles.stat}
                  value={0}
                  suffix="%"
                  valueStyle={{ color: '#FF7303' }}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <BudgetProforma />
          </Row>
          <Row>
            <StandardCost />
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Budget;
