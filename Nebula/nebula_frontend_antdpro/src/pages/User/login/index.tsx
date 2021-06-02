import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, message, Card } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang } from 'umi';
import Footer from '@/components/Footer';
import type { LoginParamsType } from '@/services/login';
import { realAccountLogin } from '@/services/login';

import styles from './styles.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
// const goto = () => {
//   if (!history) return;
//   setTimeout(() => {
//     const { query } = history.location;
//     const { redirect } = query as { redirect: string };
//     history.push(redirect || '/');
//   }, 10);
// };

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginStateType>({});
  // const [type, setType] = useState<string>('account');
  // const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const type = 'account';
  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     setInitialState({
  //       ...initialState,
  //       currentUser: userInfo,
  //     });
  //   }
  // };

  const handleSubmit = async (values: LoginParamsType) => {
    setSubmitting(true);
    try {
      // 登录
      const msg = await realAccountLogin({ ...values, type });
      if (msg.status === 'ok') {
        message.success('登录成功！');
        // await fetchUserInfo();
        // goto();
        history.push('/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };
  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <Card className={styles.loginForm}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src="/logo.svg" />
              </Link>
            </div>
            <div className={styles.desc}>Nebula为产品部门提供空间数据平台</div>
          </div>

          <div className={styles.main}>
            <ProForm
              initialValues={{
                autoLogin: true,
              }}
              submitter={{
                searchConfig: {
                  submitText: intl.formatMessage({
                    id: 'pages.login.submit',
                    defaultMessage: '登录',
                  }),
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                  loading: submitting,
                  size: 'large',
                  style: {
                    width: '100%',
                  },
                },
              }}
              onFinish={async (values) => {
                handleSubmit(values as LoginParamsType);
              }}
            >
              {status === 'error' && loginType === 'account' && (
                <LoginMessage
                  content={intl.formatMessage({
                    id: 'pages.login.accountLogin.errorMessage',
                    defaultMessage: '账户或密码错误（admin/ant.design)',
                  })}
                />
              )}
              <>
                <ProFormText
                  name="userName"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.username.placeholder',
                    defaultMessage: '用户名: china-vdc@wework.cn',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.username.required"
                          defaultMessage="请输入用户名!"
                        />
                      ),
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockTwoTone className={styles.prefixIcon} />,
                  }}
                  placeholder={intl.formatMessage({
                    id: 'pages.login.password.placeholder',
                    defaultMessage: '密码',
                  })}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage
                          id="pages.login.password.required"
                          defaultMessage="请输入密码！"
                        />
                      ),
                    },
                  ]}
                />
              </>
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
                </a>
              </div>
            </ProForm>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
