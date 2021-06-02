import React, { useEffect, useState } from 'react';
import { Typography, Divider, Tabs } from 'antd';
import { useParams, useIntl } from 'umi';

import KeyMetrics from './components/KeyMetrics';
import ProjectPanel from './components/ProjectPanel';
import Photos from './components/Photos';
import Documents from './components/Documents';
import { getCurrentBuilding } from '@/services/apis';

import styles from './styles.less';

const intlName = 'building';

const Building: React.FC = () => {
  const params: { buildingId: string } = useParams();
  const intl = useIntl();

  const [currentBuilding, setCurrentBuilding] = useState<API.CurrentBuildingType>();

  useEffect(() => {
    async function fetchCurrentBuilding() {
      const res = await getCurrentBuilding(params.buildingId);
      setCurrentBuilding(res);
    }

    fetchCurrentBuilding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <div>
          <img
            src={
              currentBuilding?.thubmnail || 'https://cdn.bxia.com.cn/image/image_placeholder.png'
            }
            alt="building_img"
            className={styles.buildingImg}
          />
          <div className={styles.buildingInfo}>
            <Typography.Title level={3} ellipsis>
              {currentBuilding?.name} - {currentBuilding?.stargate_building_code}
            </Typography.Title>
            <Typography.Text type="secondary">{currentBuilding?.location.address}</Typography.Text>
          </div>
        </div>
      </div>
      <Divider />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={intl.formatMessage({ id: `${intlName}.general` })} key="1">
          <>
            <KeyMetrics currentBuilding={currentBuilding} />
            {currentBuilding ? <ProjectPanel currentBuilding={currentBuilding} /> : null}
          </>
        </Tabs.TabPane>
        <Tabs.TabPane tab={intl.formatMessage({ id: `${intlName}.photo` })} key="2">
          <Photos />
        </Tabs.TabPane>
        <Tabs.TabPane tab={intl.formatMessage({ id: `${intlName}.document` })} key="3">
          <Documents />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Building;
