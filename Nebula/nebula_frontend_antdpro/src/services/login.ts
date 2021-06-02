import { request } from 'umi';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function realAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/backend/auth/login', {
    method: 'POST',
    data: params,
    requestType: 'form',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
