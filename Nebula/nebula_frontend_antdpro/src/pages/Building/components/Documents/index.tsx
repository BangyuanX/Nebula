import React from 'react';
import { Typography, Row, Col } from 'antd';
import { Link, useIntl } from 'umi';
import { LinkOutlined } from '@ant-design/icons';
import styles from './styles.less';

const intlName = 'building';

type FileBoxTypeProps = {
  fileName: string;
  fileDescription: string;
};

const FileBox: React.FC<FileBoxTypeProps> = (props) => {
  const { fileName, fileDescription } = props;
  return (
    <Col className={styles.blockCol} xl={12} lg={12} md={12} sm={24} xs={24}>
      <div className={styles.fileBlock}>
        <div>
          <img
            className={styles.fileImg}
            src="https://cdn.bxia.com.cn/image/image_placeholder.png"
            alt="project_p"
          />
          <div className={styles.fileInfo}>
            <Typography.Title level={5} ellipsis>
              {fileName}
            </Typography.Title>
            <Typography.Text type="secondary">{fileDescription}</Typography.Text>
          </div>
        </div>
        <Link to="#" className={styles.link}>
          <LinkOutlined />
        </Link>
      </div>
    </Col>
  );
};

const Documents: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <Row>
        <Typography.Text type="secondary" style={{ fontSize: 24, margin: '12px 0' }}>
          {intl.formatMessage({ id: `${intlName}.design` })}
        </Typography.Text>
      </Row>
      <Row gutter={24}>
        <FileBox fileName="Programming" fileDescription="2020/10/01 updated by xzhang4" />
        <FileBox fileName="TestFit Package" fileDescription="2020/10/01 updated by xzhang4" />
      </Row>
      <Row gutter={24}>
        <FileBox fileName="Package A" fileDescription="2020/10/01 updated by xzhang4" />
        <FileBox fileName="Package B" fileDescription="2020/10/01 updated by xzhang4" />
      </Row>
      <Row gutter={24}>
        <FileBox fileName="Move-In Package" fileDescription="2020/10/01 updated by xzhang4" />
        <FileBox fileName="A&G Package" fileDescription="2020/10/01 updated by xzhang4" />
      </Row>
      <Row gutter={24}>
        <FileBox
          fileName="Design Narative & Rendering"
          fileDescription="2020/10/01 updated by xzhang4"
        />
        <FileBox fileName="Opening Photos" fileDescription="2020/10/01 updated by xzhang4" />
      </Row>
      <Row gutter={24}>
        <FileBox fileName="Ops Metrics" fileDescription="2020/10/01 updated by xzhang4" />
      </Row>
      <Row>
        <Typography.Text type="secondary" style={{ fontSize: 24, margin: '12px 0' }}>
          {intl.formatMessage({ id: `${intlName}.tdd` })}
        </Typography.Text>
      </Row>
      <Row gutter={24}>
        <FileBox
          fileName="Technical Due Dilligence Report"
          fileDescription="2020/10/01 updated by xzhang4"
        />
        <FileBox fileName="ITC Drawings" fileDescription="2020/10/01 updated by xzhang4" />
      </Row>
    </>
  );
};

export default Documents;
