// Floor Map核心使用到的第三方库是react-three-fiber
// react-three-fiber是ThreeJS的一个React的封装版本，据官方说明，性能没有收到影响

import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';

import { Card, Modal, Button, Select } from 'antd';
import { FullscreenOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import Content from './Content';

import './index.less';

const FloorMap: React.FC<{
  rooms: API.RoomType[];
  cardHeight: number;
  loading: boolean;
}> = (props) => {
  const { rooms, cardHeight, loading } = props;
  const [visible, setVisible] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<{
    name: string;
    room_number: string;
    program_type: string;
  }>();
  const [measureMode, setMeasureMode] = useState(false);
  const [mode, setMode] = useState('normal');

  // 将 Floor Map 全屏
  const toggleFullScreen = () => {
    const videoElement = document.getElementById('floormap');
    // @ts-ignore
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      // @ts-ignore
      if (videoElement.mozRequestFullScreen) {
        // @ts-ignore
        videoElement.mozRequestFullScreen();
      } else {
        // @ts-ignore
        videoElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
    } else {
      // @ts-ignore
      document.webkitCancelFullScreen();
    }
  };

  const toggleMeasureMode = () => {
    setMeasureMode(!measureMode);
  };

  return (
    <Card
      bordered={false}
      style={{ padding: 0, height: cardHeight, marginLeft: 12 }}
      bodyStyle={{ padding: 0, height: '100%', backgroundColor: '#e5e5e5' }}
      loading={loading}
    >
      {rooms ? (
        <>
          <Canvas
            id="floormap"
            className="map"
            orthographic
            camera={{
              zoom: 1,
              up: [0, 0, 1],
              position: [0, 0, 500],
              near: -1000,
              far: 1000,
            }}
          >
            <Content
              mode={mode}
              measureMode={measureMode}
              rooms={rooms}
              setVisible={setVisible}
              setCurrentRoom={setCurrentRoom}
            />
          </Canvas>
          <Button
            onClick={toggleFullScreen}
            icon={<FullscreenOutlined />}
            style={{ position: 'absolute', top: 10, right: 10 }}
          />
          <Button
            onClick={toggleMeasureMode}
            type={measureMode ? 'primary' : 'default'}
            icon={<ColumnWidthOutlined />}
            style={{ position: 'absolute', top: 50, right: 10 }}
          />
          <Select
            value={mode}
            style={{ width: 120, position: 'absolute', top: 10, left: 10 }}
            onChange={(value) => setMode(value)}
          >
            <Select.Option value="normal">Normal</Select.Option>
            <Select.Option value="occupancy">Occupancy</Select.Option>
            <Select.Option value="expiration">Expiration</Select.Option>
          </Select>
          <Modal
            title={currentRoom ? currentRoom.room_number : 'Loading'}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          >
            {currentRoom ? (
              <>
                <img
                  src="https://cdn.bxia.com.cn/image/image_placeholder.png"
                  style={{ height: 200, width: 200, marginRight: 40 }}
                  alt="img_placeholder"
                />
                <div style={{ display: 'inline-block', position: 'absolute' }}>
                  <p>Room Name: {currentRoom.name}</p>
                  <p>Room Number: {currentRoom.room_number}</p>
                  <p>Program Type: {currentRoom.program_type}</p>
                  <p>
                    Member: <a>?</a>
                  </p>
                  <p>Expire Date: ?</p>
                </div>
              </>
            ) : null}
          </Modal>
        </>
      ) : (
        <img
          src="https://cdn.bxia.com.cn/image/image_placeholder.png"
          style={{ height: 500, width: '100%', marginRight: 40 }}
          alt="img_placeholder"
        />
      )}
    </Card>
  );
};

export default FloorMap;
