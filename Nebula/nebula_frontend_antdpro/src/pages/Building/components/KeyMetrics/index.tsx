import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { useIntl } from 'umi';
import styles from './styles.less';

const intlName = 'building';

const KeyMetrics: React.FC<{ currentBuilding: API.CurrentBuildingType | undefined }> = (props) => {
  const { currentBuilding } = props;

  const intl = useIntl();
  return (
    <Row gutter={24}>
      <Col
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <Card title={intl.formatMessage({ id: `${intlName}.deskcount` })} bordered={false}>
          <Statistic
            className={styles.stat}
            value={currentBuilding?.deskcount}
            valueStyle={{ color: '#FE7303' }}
            suffix="WU"
          />
        </Card>
      </Col>
      <Col
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <Card title={intl.formatMessage({ id: `${intlName}.floors` })} bordered={false}>
          <Statistic
            className={styles.stat}
            value={currentBuilding?.ww_floor_count ? currentBuilding?.ww_floor_count : 0}
            valueStyle={{ color: '#FE7303' }}
          />
        </Card>
      </Col>
      <Col
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <Card title={intl.formatMessage({ id: `${intlName}.area` })} bordered={false}>
          <Statistic
            className={styles.stat}
            // @ts-ignore
            value={currentBuilding?.usf / 10.764}
            precision={2}
            valueStyle={{ color: '#FE7303' }}
            suffix="m&sup2;"
          />
        </Card>
      </Col>
      <Col
        xl={6}
        lg={6}
        md={12}
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <Card title={intl.formatMessage({ id: `${intlName}.occupancy` })} bordered={false}>
          <Statistic
            className={styles.stat}
            value={currentBuilding?.occupancy ? currentBuilding?.occupancy : 'N/A'}
            valueStyle={{ color: '#FE7303' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default KeyMetrics;
