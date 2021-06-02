import { request } from 'umi';

export type buildingListParamType = {
  page?: number;
  size?: number;
  search?: string;
  'filter[city]'?: string;
  'filter[status]'?: string;
};

export async function getBuildingList(params: buildingListParamType) {
  return request<{
    data: API.BuildingListBuildingType[];
    size: number;
    page: number;
    full_count: number;
  }>('/backend/v1/buildings', {
    method: 'GET',
    params: { ...params },
  }).catch(() => {
    return { data: [], size: 10, page: 1, full_count: 0 };
  });
}

export async function getCurrentBuilding(buildingId: string) {
  return request<API.CurrentBuildingType>(`/backend/v1/buildings/${buildingId}`);
}

export async function getProjectFloors(projectId: string) {
  return request<{
    count: number;
    data: API.FloorType[];
  }>(`/backend/v1/floors`, {
    method: 'GET',
    params: {
      project: projectId,
    },
  });
}

export async function getFloorRooms(floorId: string) {
  return request<{
    count: number;
    data: API.RoomType[];
  }>('/backend/v1/rooms', {
    method: 'GET',
    params: {
      floor: floorId,
    },
  });
}

export async function getCurrentProject(projectId: string) {
  return request<API.CurrentProjectType>(`/backend/v1/projects/${projectId}`);
}
