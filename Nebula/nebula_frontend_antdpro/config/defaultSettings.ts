import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { CSSProperties } from 'react';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  contentStyle?: CSSProperties;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#FF7303',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  colorWeak: false,
  title: false,
  pwa: false,
  logo: 'https://cdn.bxia.com.cn/logo/nebula.svg',
  iconfontUrl: '',
  contentStyle: {
    margin: '24px 140px',
  },
};

export default Settings;
