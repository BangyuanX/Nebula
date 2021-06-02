import React from 'react';
import { Col, Card, Typography, Row } from 'antd';

import styles from './styles.less';

const team_member = [
  {
    name: 'Tony Tao',
    title: 'Project Manager',
  },
  {
    name: 'Luke Chen',
    title: 'Architect',
  },
  {
    name: 'Federico Nie',
    title: 'Interior Designer',
  },
  {
    name: 'Xin Zhang',
    title: 'Design Technologist',
  },
  {
    name: 'Peng Zhang',
    title: 'Construction Project Manager',
  },
  {
    name: 'Caroline Bai',
    title: 'Project Delivery Director',
  },
  {
    name: 'Emma Ni',
    title: 'Assistant Project Manager',
  },
  {
    name: 'Kendrick Lu',
    title: 'Building Openings',
  },
  {
    name: 'Yifei Xu',
    title: 'Construction Specialist',
  },
  {
    name: 'Linlin Teng',
    title: 'ICT Engineer',
  },
  {
    name: 'Jenny Chuang',
    title: 'Interior Designer',
  },
  {
    name: 'Xiao Shi',
    title: 'Lighting Designer',
  },
  {
    name: 'Frank Wu',
    title: 'MEP Engineer',
  },
];

const MemberLine: React.FC<{ name: string; title: string }> = (props) => {
  const { name, title } = props;
  return (
    <div className={styles.projInfoBlock}>
      <Typography.Paragraph className={styles.projInfoLine}>
        <Typography.Text>{title}</Typography.Text>
        <Typography.Text type="secondary">{name}</Typography.Text>
      </Typography.Paragraph>
    </div>
  );
};

function TeamMember() {
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
      <Card title="Project Team" bordered={false} style={{ height: 400 }}>
        <Row>
          <Col className={styles.openInfo} xl={6} lg={6} md={6} sm={24} xs={24}>
            <div>
              <Typography.Title level={3} style={{ color: '#FF7303' }}>
                {team_member.length}
              </Typography.Title>
              <Typography.Text type="secondary">Team Member</Typography.Text>
            </div>
          </Col>
          <Col xl={18} lg={18} md={18} sm={18} xs={24} style={{ height: 294, overflowY: 'auto' }}>
            {team_member.map((member, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <MemberLine key={index} name={member.name} title={member.title} />
            ))}
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default TeamMember;
