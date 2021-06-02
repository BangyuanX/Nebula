import React from 'react';
import { Table, Col, Card } from 'antd';
import { useIntl } from 'umi';

const namespace = 'project';

const RoomTable: React.FC<{ loading: boolean; rooms: API.RoomType[] }> = (props) => {
  const { loading, rooms } = props;
  const intl = useIntl();
  const columns = [
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'room',
      align: 'center',
    },
    {
      title: 'Room Number',
      dataIndex: 'room_number',
      key: 'roomNumber',
      align: 'center',
    },
    {
      title: 'Has Window',
      dataIndex: 'has_window',
      key: 'hasWindow',
      align: 'center',
    },
    {
      title: 'Desk Count',
      dataIndex: 'deskcount',
      key: 'deskcount',
      align: 'center',
    },
    {
      title: 'Physical Desk Count',
      dataIndex: 'physical_deskcount',
      key: 'physicalDeskCount',
      align: 'center',
    },
    {
      title: 'Program Type',
      dataIndex: 'program_type',
      key: 'programType',
      align: 'center',
    },
    {
      title: 'Internal Room Count',
      dataIndex: 'internal_room_count',
      key: 'internalRoomCount',
      align: 'center',
    },
    {
      title: 'Has AV',
      dataIndex: 'has_av',
      key: 'hasAV',
      align: 'center',
    },
  ];

  /* eslint-disable array-callback-return */
  const roomData: any = [];
  rooms.map((room) => {
    const {
      id,
      name,
      room_number,
      has_window,
      deskcount,
      physical_deskcount,
      program_type,
      internal_room_count,
    } = room;

    const roomInfo = {
      id,
      name,
      room_number,
      has_window: has_window ? 'Yes' : 'No',
      deskcount,
      physical_deskcount,
      program_type,
      internal_room_count,
      has_av: 'No',
    };
    roomData.push(roomInfo);
  });

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
      <Card
        title={intl.formatMessage({ id: `${namespace}.roomTable` })}
        extra={<a href="#">Follow</a>}
        bordered={false}
        loading={loading}
      >
        <Table
          // @ts-ignore
          columns={columns}
          dataSource={roomData}
          rowKey={(record) => record.id}
          pagination={{ defaultPageSize: 5 }}
        />
      </Card>
    </Col>
  );
};

export default RoomTable;
