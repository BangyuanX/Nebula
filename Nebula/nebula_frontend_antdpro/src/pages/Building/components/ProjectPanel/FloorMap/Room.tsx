import React, { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
// @ts-ignore
import TextTexture from 'three.texttexture';
import { Html } from '@react-three/drei';
import { message } from 'antd';
import { colorSchema, calculatePolygonGravityCeneter, roomTexture } from './utils';

type RoomPropsType = {
  room: API.RoomType;
  setVisible: any;
  setCurrentRoom: any;
  mode: string;
  measureMode: boolean;
  start: [number, number] | undefined;
  setStart: any;
  setPoints: any;
  drawing: boolean;
  setDrawing: any;
};

const Room: React.FC<RoomPropsType> = (props) => {
  const {
    room: {
      id,
      boundary: { coordinates },
      program_type,
      room_number,
      name,
      deskcount,
    },
    setVisible,
    setCurrentRoom,
    mode,
    measureMode,
    start,
    setStart,
    drawing,
    setDrawing,
    setPoints,
  } = props;

  const [hovered, setHover] = useState(false);

  const { roomShape: shape, gravityX: centerX, gravityY: centerY } = useMemo(() => {
    const roomExterior = coordinates[0];
    const { gravityX, gravityY } = calculatePolygonGravityCeneter(roomExterior);

    const exteriorPointArray = [];
    for (let i = 0; i < roomExterior.length; i += 1) {
      const x = roomExterior[i][0] - gravityX;
      const y = roomExterior[i][1] - gravityY;
      const point = new THREE.Vector2(x, y);
      exteriorPointArray.push(point);
    }
    const roomShape = new THREE.Shape(exteriorPointArray);

    if (coordinates.length > 1) {
      const roomHoles = coordinates.slice(1, coordinates.length);
      const HolesArray = [];
      for (let i = 0; i < roomHoles.length; i += 1) {
        const HoleArray = [];
        for (let j = 0; j < roomHoles[i].length; j += 1) {
          const x = roomHoles[i][j][0] - gravityX;
          const y = roomHoles[i][j][1] - gravityY;
          const point = new THREE.Vector2(x, y);
          HoleArray.push(point);
        }
        HolesArray.push(new THREE.Path(HoleArray));
      }
      roomShape.holes = HolesArray;
    }
    return { roomShape, gravityX, gravityY };
  }, [coordinates]);

  const geometry = useMemo(
    () => new THREE.ExtrudeBufferGeometry(shape, { depth: 10, bevelEnabled: false, steps: 1 }),
    [shape],
  );

  const { roomText: text, imageWidth: w, imageHeight: h } = useMemo(() => {
    const roomText = new TextTexture({
      text: room_number,
      fontSize: 64,
      fontFamily: 'Arial, Helvetica, sans-serif',
      align: 'center',
      fontWeight: 'bold', // normal, bold, bolder, lighter
      fontStyle: 'normal', // normal, italic, oblique,
    });

    // resize the sprite depending on aspect
    const imageWidth = roomText.image.width;
    const imageHeight = roomText.image.height;
    return { roomText, imageWidth, imageHeight };
  }, [room_number]);
  const imgUrl = roomTexture[name];
  const texture = useMemo(() => new THREE.TextureLoader().load(imgUrl), [imgUrl]);

  const handleRoomOnClick = () => {
    setCurrentRoom({
      name,
      room_number,
      program_type,
    });
    setVisible(true);
  };

  const { isOccupied: occupied, isExpired6: expired6 } = useMemo(() => {
    const randomNumber = Math.random();
    const isOccupied = randomNumber >= 0.3;
    const isExpired6 = randomNumber >= 0.8;
    return { isOccupied, isExpired6 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleWorkColor = () => {
    if (hovered) {
      return 'hotpink';
    }
    switch (mode) {
      case 'normal':
        return colorSchema[mode][program_type];
      case 'occupancy':
        if (program_type === 'WORK') {
          if (occupied) {
            return colorSchema[mode].WORK1;
          }
          return colorSchema[mode].WORK0;
        }
        return colorSchema[mode][program_type];
      case 'expiration':
        if (program_type === 'WORK') {
          if (expired6) {
            return colorSchema[mode].WORK1;
          }
          return colorSchema[mode].WORK0;
        }
        return colorSchema[mode][program_type];
      default:
        break;
    }
    return colorSchema[mode][program_type];
  };

  // @ts-ignore
  const handleMeshClick = (event) => {
    const {
      point: { x, y },
    } = event;
    if (!drawing) {
      setStart([x, y]);
      setDrawing(true);
    } else {
      setDrawing(false);
      setPoints([
        // @ts-ignore
        [start[0], start[1], 5],
        [x, y, 5],
      ]);
      // @ts-ignore
      const distance = Math.sqrt((start[0] - x) ** 2 + (start[1] - y) ** 2);
      message.success(`Distance Result: ${distance.toFixed(2)} m`);
    }
  };

  useEffect(() => {
    if (measureMode) {
      const canvasEl: any = document.getElementById('floormap');
      if (hovered) {
        canvasEl.style.cursor = 'crosshair';
      } else {
        canvasEl.style.cursor = 'default';
      }
    }
  }, [hovered, measureMode]);

  return program_type === 'WORK' || program_type === 'MEET' ? (
    <>
      <mesh
        position={[centerX, centerY, 0]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={measureMode ? handleMeshClick : handleRoomOnClick}
      >
        <extrudeGeometry
          attach="geometry"
          args={[shape, { depth: 10, bevelEnabled: false, steps: 1 }]}
        />
        <meshPhongMaterial attach="material" color={handleWorkColor()} side={THREE.BackSide} />
        <sprite position={[0, 0, 6]} scale={[(w / h) * 3, 3, 1]}>
          <spriteMaterial attach="material" color="#000" map={text} />
        </sprite>
        {measureMode ? null : (
          <Html style={{ pointerEvents: 'none', display: hovered ? 'block' : 'none' }}>
            <div className="content">
              {program_type === 'WORK' ? (
                <>
                  <p>
                    Room Number: <br />
                    {room_number}
                  </p>
                  <p>
                    Room Name: <br />
                    {name}
                  </p>
                  <p>
                    Desk Count: <br />
                    {deskcount}
                  </p>
                  <p>
                    Current Member: <br />
                    上海洋槐商务信息有限公司
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Room Number: <br />
                    {room_number}
                  </p>
                  <p>
                    Room Name: <br />
                    {name}
                  </p>
                  <p>
                    Meeting Room Capacity: <br />
                    10p
                  </p>
                  <p>Available: Yes</p>
                </>
              )}
            </div>
          </Html>
        )}
      </mesh>
      <lineSegments position={[centerX, centerY, 0]}>
        <edgesGeometry attach="geometry" args={[geometry, 1]} />
        <lineBasicMaterial color="black" attach="material" />
      </lineSegments>
    </>
  ) : (
    <>
      <mesh position={[centerX, centerY, 0]}>
        <shapeBufferGeometry attach="geometry" args={[shape]} />
        <lineBasicMaterial attach="material" color={colorSchema[mode][program_type]} />
        <sprite position={[0, 0, 6]} scale={[3, 3, 1]}>
          <spriteMaterial attach="material" map={texture} />
        </sprite>
      </mesh>
    </>
  );
};

export default Room;
