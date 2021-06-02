import React, { useRef } from 'react';
import { Carousel, Col, Row, Card, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import styles from './styles.less';

const ProjectImages: React.FC = () => {
  const carouselRef = useRef(null);
  return (
    <Row>
      <Col
        xl={24}
        lg={24}
        md={24}
        sm={12}
        xs={24}
        style={{
          marginBottom: 24,
        }}
      >
        <Card bodyStyle={{ padding: 0 }} bordered={false}>
          <Button
            className={styles.carouselButton}
            style={{ left: 20 }}
            icon={<LeftOutlined />}
            // @ts-ignore
            onClick={() => carouselRef.current.prev()}
            shape="circle"
            size="large"
          />
          <Button
            className={styles.carouselButton}
            style={{ right: 20 }}
            icon={<RightOutlined />}
            // @ts-ignore
            onClick={() => carouselRef.current.next()}
            shape="circle"
            size="large"
          />
          <Carousel ref={carouselRef} dots={false}>
            <div>
              <iframe
                title="VR Tour"
                width="853"
                height="450"
                src="https://my.matterport.com/show/?m=qFPYsh2pWuJ"
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </div>
            <div>
              <img
                className={styles.projectImg}
                alt="img01"
                src="https://cdn.bxia.com.cn/image/building_img_01.jpg"
              />
            </div>
            <div>
              <img
                className={styles.projectImg}
                alt="img01"
                src="https://cdn.bxia.com.cn/image/building_img_02.jpg"
              />
            </div>
          </Carousel>
        </Card>
      </Col>
    </Row>
  );
};

export default ProjectImages;
