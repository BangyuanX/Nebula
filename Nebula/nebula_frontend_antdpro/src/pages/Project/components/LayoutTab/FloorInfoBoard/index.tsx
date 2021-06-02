import React from 'react';
import { Col, Card, Select, Typography, Divider } from 'antd';
import './index.less';

const { Option } = Select;
const { Text, Paragraph } = Typography;

const InfoItem: React.FC<{ title: string; stat: string | number }> = ({ title, stat }) => {
  return (
    <Paragraph className="floor-info">
      <Text>{title}</Text>
      <Text>{stat}</Text>
    </Paragraph>
  );
};

type FloorInfoBoardType = {
  loading: boolean;
  floors: API.FloorType[];
  currentFloorId: string;
  setCurrentFloorId: (value: string) => void;
};

const FloorInfoBoard: React.FC<FloorInfoBoardType> = (props) => {
  const { loading, floors, currentFloorId, setCurrentFloorId } = props;

  // @ts-ignore
  const currentFloor: API.FloorType = floors.find((floor) => floor.id === currentFloorId);

  const { usf, geo_level, deskcount, physical_deskcount, egress } = currentFloor;

  const handleFloorChange = (value: string) => {
    setCurrentFloorId(value);
  };

  return (
    <Col
      xl={6}
      lg={6}
      md={24}
      sm={24}
      xs={24}
      style={{
        marginBottom: 24,
      }}
    >
      <Card title="Floor Info" bordered={false} loading={loading} style={{ height: 600 }}>
        <Text>Current Floor: </Text>
        <Select defaultValue={currentFloorId} style={{ width: 200 }} onChange={handleFloorChange}>
          {floors.map((floor) => {
            const { id, name } = floor;
            return (
              <Option key={id} value={id}>
                {name}
              </Option>
            );
          })}
        </Select>
        <Divider />
        <InfoItem title="USF" stat={usf} />
        <InfoItem title="Geometric Level" stat={geo_level} />
        <InfoItem title="Desk Count" stat={deskcount} />
        <InfoItem title="Physical Desk Count" stat={physical_deskcount} />
        <InfoItem title="Egress" stat={egress} />
      </Card>
    </Col>
  );
};

export default FloorInfoBoard;
