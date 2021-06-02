import React, { useEffect, useState } from 'react';
import { Typography, Divider, Tabs, Row, Col } from 'antd';
import { useParams, Link } from 'umi';
import { getCurrentProject, getFloorRooms } from '@/services/apis';

import ProjectInformation from './components/General/ProjectInformation';
import TeamMember from './components/General/TeamMember';
import FloorTable from './components/General/FloorTable';
import Documents from '../Building/components/Documents';

// Layout Tab
import FloorMap from '../Building/components/ProjectPanel/FloorMap';
import FloorInfoBoard from './components/LayoutTab/FloorInfoBoard';
import RoomTable from './components/LayoutTab/RoomTable';

// Budget Tab
import Budget from './components/Budget';

import styles from './styles.less';

const Project: React.FC = () => {
  const params: { projectId: string } = useParams();

  const [currentProject, setCurrentProject] = useState<API.CurrentProjectType>();
  const [currentFloorId, setCurrentFloorId] = useState<string>('');
  const [rooms, setRooms] = useState<API.RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCurrentProject() {
      const res = await getCurrentProject(params.projectId);
      setCurrentProject(res);
      setCurrentFloorId(res.floors !== [] ? res.floors[0].id : '');
    }

    fetchCurrentProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  //   useEffect(() => {
  //     onFetchProject(params.projectId);
  //   }, [params]);

  //   useEffect(() => {
  //     if (currentProject) {
  //       setCurrentFloorId(currentProject.floors[0].id);
  //     }
  //   }, [currentProject]);

  //   useEffect(() => {
  //     if (currentFloorId) {
  //       onFetchRooms(currentProject.id, currentFloorId);
  //     }
  //   }, [currentFloorId]);

  return (
    <div>
      <div>
        <div>
          <img
            src="https://cdn.bxia.com.cn/image/image_placeholder.png"
            alt="building_img"
            className={styles.projectImg}
          />
          <div className={styles.projectInfo}>
            <div>
              <Link to={`/building/${currentProject?.building_id}`}>
                <Typography.Title level={3} ellipsis underline style={{ display: 'inline-block' }}>
                  {`${currentProject?.project.name || ''}`}
                </Typography.Title>
              </Link>
              <Typography.Title level={3} ellipsis style={{ display: 'inline-block' }}>
                &nbsp;{`/ Project${currentProject?.project.number || 0}`}
              </Typography.Title>
            </div>
            <Typography.Text type="secondary">{currentProject?.address}</Typography.Text>
          </div>
        </div>
      </div>
      <Divider />
      <Tabs>
        <Tabs.TabPane tab="General" key="1">
          {currentProject ? (
            <>
              <Row gutter={24}>
                <ProjectInformation currentProject={currentProject} />
                <TeamMember />
              </Row>
              <Row gutter={24}>
                <FloorTable floors={currentProject.floors} />
              </Row>
            </>
          ) : null}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Layout" key="2">
          <Row gutter={24}>
            <Col
              xl={18}
              lg={18}
              md={18}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <FloorMap rooms={rooms} cardHeight={600} loading={loading} />
            </Col>
            {currentProject ? (
              <FloorInfoBoard
                loading={loading}
                floors={currentProject.floors}
                currentFloorId={currentFloorId}
                setCurrentFloorId={setCurrentFloorId}
              />
            ) : null}
          </Row>
          <Row gutter={24}>
            <RoomTable loading={loading} rooms={rooms} />
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Documents" key="3">
          <Documents />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Budget" key="4">
          <Budget />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Schedule" key="5">
          <img
            src="https://cdn.bxia.com.cn/image/project_schedule_placeholder.png"
            alt="schedule_placeholder"
            width="1200"
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Project;
