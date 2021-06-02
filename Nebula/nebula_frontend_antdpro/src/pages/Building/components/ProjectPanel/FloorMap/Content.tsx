import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from 'react-three-fiber';
import { OrbitControls, Line } from '@react-three/drei';
import Room from './Room';

type ContentPropsType = {
  mode: string;
  measureMode: boolean;
  rooms: API.RoomType[];
  setVisible: any;
  setCurrentRoom: any;
};

function Content(props: ContentPropsType) {
  const { mode, measureMode, rooms, setVisible, setCurrentRoom } = props;
  const roomGroup = useRef();
  const cameraControl = useRef();
  const [points, setPoints] = useState<[number, number, number][]>([
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [start, setStart] = useState<[number, number]>();
  const [drawing, setDrawing] = useState(false);

  const lineProps = { start, setStart, setPoints, drawing, setDrawing };

  const {
    camera,
    size: { width, height },
  } = useThree();

  useEffect(() => {
    if (roomGroup.current) {
      // @ts-ignore
      const bbox = new THREE.Box3().setFromObject(roomGroup.current);
      // @ts-ignore
      bbox.getCenter(roomGroup.current.position).multiplyScalar(-1);
      const cameraZoom =
        0.9 * Math.min(width / (bbox.max.x - bbox.min.x), height / (bbox.max.y - bbox.min.y));
      camera.zoom = cameraZoom;
      camera.updateProjectionMatrix();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomGroup]);

  useFrame(({ mouse }) => {
    if (drawing) {
      const cursorX = (mouse.x * width) / camera.zoom / 2 + camera.position.x;
      const cursorY = (mouse.y * height) / camera.zoom / 2 + camera.position.y;
      setPoints([
        // @ts-ignore
        [start[0], start[1], 5],
        [cursorX, cursorY, 5],
      ]);
    }
  });

  return (
    <>
      <directionalLight position={[100, 100, 100]} args={['#fff', 1]} />
      <directionalLight position={[-100, -100, 100]} args={['#fff', 0.65]} />
      <group ref={roomGroup} name="roomGroup">
        {rooms.map((room) => (
          <Room
            mode={mode}
            measureMode={measureMode}
            key={room.id}
            room={room}
            setVisible={setVisible}
            setCurrentRoom={setCurrentRoom}
            {...lineProps}
          />
        ))}
      </group>
      {measureMode ? <Line points={points} color="red" lineWidth={1} /> : null}
      <OrbitControls
        maxPolarAngle={0}
        mouseButtons={{
          LEFT: THREE.MOUSE.PAN,
          MIDDLE: THREE.MOUSE.DOLLY,
          // @ts-ignore
          RIGHT: null,
          // RIGHT: THREE.MOUSE.ROTATE,
        }}
        screenSpacePanning
        target={[0, 0, 0]}
        ref={cameraControl}
        args={[camera]}
      />
    </>
  );
}

export default Content;
