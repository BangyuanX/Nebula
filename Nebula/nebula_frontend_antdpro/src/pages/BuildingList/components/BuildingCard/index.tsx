import React, { useState } from 'react';
import { Card, Typography, Divider } from 'antd';
import { Link } from 'umi';
import styles from './styles.less';

type ProjectInfoPropsType = {
  projectId: string;
  projectName: string;
  projectStatus: string;
};

type BuildingCardPropsType = {
  building: API.BuildingListBuildingType;
  // loading: boolean;
};

const ProjectInfo: React.FC<ProjectInfoPropsType> = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className={styles.projectBlock}>
      <div className={styles.projectIcon}>P</div>
      <div className={styles.projectInfo}>
        <Link to={`/project/${props.projectId}`}>
          <Typography.Title
            level={5}
            ellipsis
            underline={hovered}
            // @ts-ignore
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {props.projectName}
          </Typography.Title>
        </Link>
        <Typography.Text type="secondary">{props.projectStatus}</Typography.Text>
      </div>
    </div>
  );
};

const BuildingCard: React.FC<BuildingCardPropsType> = (props) => {
  const { building } = props;
  const [hovered, setHovered] = useState(false);
  return (
    <Card className={styles.buildingCard}>
      <img
        src={building.thubmnail || 'https://cdn.bxia.com.cn/image/image_placeholder.png'}
        alt="building_image_001"
        className={styles.buildingImg}
      />
      <div className={styles.buildingInfo}>
        <Link to={`/building/${building.id}`}>
          <Typography.Title
            level={3}
            ellipsis
            underline={hovered}
            // @ts-ignore
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {building.name} - {building.stargate_building_code}
          </Typography.Title>
        </Link>
        <Typography.Text type="secondary">{building.location.address}</Typography.Text>
        <Divider style={{ margin: '12px 0' }} />
        <div className={styles.projectList}>
          {building.projects.map((project) => (
            <ProjectInfo
              projectId={project.id}
              projectName={`${project.name} - P${project.number}`}
              projectStatus={`${project.status} - ${project.open_date}`}
              key={project.id}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BuildingCard;
