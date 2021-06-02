import React, { useEffect, useMemo, useState } from 'react';
import { Col, Row, Collapse, Typography } from 'antd';
import { Link } from 'umi';
import FloorMap from './FloorMap';
import { getFloorRooms, getProjectFloors } from '@/services/apis';
import styles from './styles.less';

type ProjectPanelPropsType = {
  currentBuilding: API.CurrentBuildingType;
};

const FloorInfo: React.FC<{ floor: API.FloorType }> = (props) => {
  const {
    floor: { usf, rsf, deskcount, physical_deskcount, geo_level, updated_at },
  } = props;
  return (
    <div>
      <div className={styles.floorInfoBlock}>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>USF</Typography.Text>
          <Typography.Text>{usf} m&sup2;</Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>RSF</Typography.Text>
          <Typography.Text>{rsf} m&sup2;</Typography.Text>
        </Typography.Paragraph>
      </div>
      <div className={styles.floorInfoBlock}>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>Desk Count</Typography.Text>
          <Typography.Text>{deskcount}</Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>Physical Desk Count</Typography.Text>
          <Typography.Text>{physical_deskcount}</Typography.Text>
        </Typography.Paragraph>
      </div>
      <div className={styles.floorInfoBlock}>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>Geometric Level</Typography.Text>
          <Typography.Text>{geo_level}</Typography.Text>
        </Typography.Paragraph>
        {/* <Typography.Paragraph className={styles.floorInfoLine}>
            <Typography.Text>Main Floor</Typography.Text>
            <Typography.Text>{main_floor ? 'Yes' : 'No'}</Typography.Text>
          </Typography.Paragraph> */}
      </div>
      <div className={styles.floorInfoBlock}>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>Harvest By</Typography.Text>
          {/* <Typography.Text>{harvest_by}</Typography.Text> */}
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.floorInfoLine}>
          <Typography.Text>Update At</Typography.Text>
          <Typography.Text>{updated_at}</Typography.Text>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

type FloorRowsPropsType = {
  projectId: string;
  currentFloorId: string;
  setCurrentFloorId: (value: string) => void;
};

const FloorRows: React.FC<FloorRowsPropsType> = (props) => {
  const { projectId, currentFloorId, setCurrentFloorId } = props;
  const [floors, setFloors] = useState<API.FloorType[]>([]);

  useMemo(() => {
    async function fetchProjectFloors() {
      const res = await getProjectFloors(projectId);
      setFloors(res.data ? res.data : []);
      setCurrentFloorId(res.data.length !== 0 ? res.data[0].id : '');
    }

    fetchProjectFloors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Collapse
      activeKey={currentFloorId}
      // @ts-ignore
      onChange={(value) => setCurrentFloorId(value)}
      expandIconPosition="right"
      bordered={false}
      accordion
    >
      {floors.map((floor) => (
        <Collapse.Panel
          header={floor.name}
          key={floor.id}
          extra={`${floor.deskcount} / ${floor.egress}`}
        >
          <FloorInfo floor={floor} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

const ProjectRow: React.FC<{ proj: API.ProjectType }> = (props) => {
  const {
    proj: { id, name, number, status, open_date },
  } = props;
  const [hovered, setHovered] = useState(false);
  return (
    <div>
      <img
        src="https://cdn.bxia.com.cn/image/image_placeholder.png"
        alt="project_p"
        className={styles.projectImg}
      />
      <div className={styles.projInfo}>
        <Link to={`/project/${id}`}>
          <Typography.Title
            level={4}
            ellipsis
            underline={hovered}
            // @ts-ignore
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {`${name} - P${number}`}
          </Typography.Title>
        </Link>
        <Typography.Text type="secondary">{`${status} - ${open_date}`}</Typography.Text>
      </div>
    </div>
  );
};

const ProjectPanel: React.FC<ProjectPanelPropsType> = (props) => {
  const { currentBuilding } = props;
  const [currentProjectId, setCurrentProjectId] = useState(currentBuilding.projects[0].id);
  const [currentFloorId, setCurrentFloorId] = useState<string>('');
  const [rooms, setRooms] = useState<API.RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRooms() {
      const res = await getFloorRooms(currentFloorId);
      setLoading(false);
      setRooms(res.data);
    }
    if (currentFloorId) {
      setLoading(true);
      fetchRooms();
    }
  }, [currentFloorId]);

  return (
    <Row>
      <Col
        xl={12}
        lg={12}
        md={12}
        sm={24}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <div className={styles.projPanel}>
          <Collapse
            defaultActiveKey={currentProjectId}
            // @ts-ignore
            onChange={(value) => setCurrentProjectId(value)}
            bordered={false}
            accordion
          >
            {currentBuilding.projects.map((proj) => (
              <Collapse.Panel header={<ProjectRow proj={proj} />} key={proj.id} showArrow={false}>
                <FloorRows
                  projectId={proj.id}
                  currentFloorId={currentFloorId}
                  setCurrentFloorId={setCurrentFloorId}
                />
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
      </Col>
      <Col
        xl={12}
        lg={12}
        md={12}
        sm={24}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <FloorMap rooms={rooms} cardHeight={500} loading={loading} />
      </Col>
    </Row>
  );
};

export default ProjectPanel;
