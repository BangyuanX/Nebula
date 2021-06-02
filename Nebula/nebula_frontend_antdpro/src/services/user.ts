import { request } from 'umi';

export type FetchUserParamsType = {
  open_id?: string,
  employee_id?: string,
}

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

export async function queryFeishuUser(params: FetchUserParamsType, tenantToken: string): Promise<any> {
  return request<API.CurrentUser>('/feishuAPI/contact/v1/user/get', {
    method: 'GET',
    data: params,
    headers: {
      'Authorization': `Bearer ${tenantToken}`
    }
  })
}