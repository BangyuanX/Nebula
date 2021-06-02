import React from 'react';
import { Col, Card, Typography, Row } from 'antd';

import styles from './styles.less';

const ProjectInformation: React.FC<{ currentProject: API.CurrentProjectType }> = (props) => {
  const {
    currentProject: {
      project: { status, open_date },
      // building_city: city,
      // attributes: {
      //   open_date: openDate,
      //   program_type: programType,
      //   possession_date: possessionDate,
      // },
    },
  } = props;
  return (
    <Col
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={24}
      style={{
        marginBottom: 24,
      }}
    >
      <Card title="Project Information" className={styles.infoCard} bordered={false}>
        <Row>
          <Col className={styles.openInfo} xl={6} lg={6} md={6} sm={24} xs={24}>
            <div>
              <Typography.Title level={3} style={{ color: '#FF7303' }}>
                {open_date || 'Unknown'}
              </Typography.Title>
              <Typography.Text type="secondary">First Opening</Typography.Text>
            </div>
          </Col>
          <Col xl={18} lg={18} md={18} sm={18} xs={24}>
            <div className={styles.projInfoBlock}>
              <Typography.Paragraph className={styles.projInfoLine}>
                <Typography.Text>Status</Typography.Text>
                <Typography.Text type="secondary">{status}</Typography.Text>
              </Typography.Paragraph>
            </div>
            {/* <div className={styles.projInfoBlock}>
              <Typography.Paragraph className={styles.projInfoLine}>
                <Typography.Text>Program Type</Typography.Text>
                <Typography.Text type="secondary">{programType}</Typography.Text>
              </Typography.Paragraph>
            </div>
            <div className={styles.projInfoBlock}>
              <Typography.Paragraph className={styles.projInfoLine}>
                <Typography.Text>City</Typography.Text>
                <Typography.Text type="secondary">{city}</Typography.Text>
              </Typography.Paragraph>
            </div>
            <div className={styles.projInfoBlock}>
              <Typography.Paragraph className={styles.projInfoLine}>
                <Typography.Text>Possesion Date</Typography.Text>
                <Typography.Text type="secondary">{possessionDate}</Typography.Text>
              </Typography.Paragraph>
            </div> */}
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProjectInformation;
