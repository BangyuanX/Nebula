import React from 'react';
import { Table, Col, Card } from 'antd';

const FloorTable: React.FC<{ floors: API.FloorType[] }> = (props) => {
  const { floors } = props;
  const columns = [
    {
      title: 'Floor Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'USF',
      dataIndex: 'usf',
      key: 'usf',
      align: 'center',
    },
    {
      title: 'RSF',
      dataIndex: 'rsf',
      key: 'rsf',
      align: 'center',
    },
    {
      title: 'Geometric Level',
      dataIndex: 'geo_level',
      key: 'geoLevel',
      align: 'center',
    },
    {
      title: 'WU',
      dataIndex: 'deskcount',
      key: 'workUnit',
      align: 'center',
    },
    {
      title: 'Physical Desk',
      dataIndex: 'physical_deskcount',
      key: 'physicalDesk',
      align: 'center',
    },
    {
      title: 'Max Egress',
      dataIndex: 'egress',
      key: 'maxEgress',
      align: 'center',
    },
    {
      title: 'C.O.G',
      dataIndex: 'cog',
      key: 'cog',
      align: 'center',
    },
  ];

  const floorData: any = [];
  if (floors) {
    floors.forEach((floor) => {
      const {
        id,
        name,
        geo_level,
        deskcount,
        physical_deskcount,
        rsf,
        usf,
        egress,
        // main_floor
      } = floor;
      const floorInfo = {
        id,
        name,
        geo_level,
        deskcount,
        physical_deskcount,
        rsf,
        usf,
        egress,
        cog: 'No',
      };
      floorData.push(floorInfo);
    });
  }

  return (
    <Col
      xl={24}
      lg={24}
      md={24}
      sm={24}
      xs={24}
      style={{
        marginBottom: 24,
      }}
    >
      <Card title="Floors" bordered={false} bodyStyle={{ height: 393, padding: '0 16px' }}>
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={floorData}
          rowKey={(record) => record.id}
          pagination={{ defaultPageSize: 5 }}
          bordered
        />
      </Card>
    </Col>
  );
};

export default FloorTable;
