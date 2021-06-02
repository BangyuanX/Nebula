declare namespace API {
  export type CurrentUser = {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  };

  export type LoginStateType = {
    status?: 'ok' | 'error';
    type?: string;
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };

  // backend APIs

  export type BuildingListBuildingType = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    stargate_building_code: string;
    location: BuildingListLocationType;
    projects: ProjectType[];
    thubmnail: string;
  };

  export type BuildingListLocationType = {
    id: string;
    created_at: string;
    updated_at: string;
    address: string;
    address_sc: string;
    address_tc: string;
    city: string;
    province: string;
    marketing: string;
    lon: number;
    lat: number;
  };

  export type ProjectType = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    status: string;
    open_date: string | null;
    number: number;
  };

  export type CurrentBuildingType = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    stargate_building_code: string;
    location: BuildingListLocationType;
    projects: ProjectType[];
    landlord: string | null;
    usf: number;
    deskcount: number;
    physical_deskcount: number;
    ww_floor_count: number | null;
    occupancy: number | null;
    po_count: number | null;
    thubmnail: string;
  };

  export type FloorType = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    deskcount: number;
    physical_deskcount: number;
    rsf: number;
    usf: number;
    geo_level: number;
    note: string;
    lounge_area: number | null;
    egress: number;
  };

  export type RoomType = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    room_number: string;
    program_type: string;
    boundary: {
      type: string;
      // 第一个层级：判断房间是否有镂空
      // 第二个层级：封闭环的坐标点
      // 第三个层级：坐标点的x, y, z
      coordinates: [number, number, number][][];
    };
    note: string | null;
    deskcount: number;
    physical_deskcount: number;
    area: number;
    has_window: boolean;
    internal_room_count: number;
  };

  export type CurrentProjectType = {
    project: API.ProjectType;
    floors: API.FloorType[];
    building_id: string;
    building_name: string;
    address: string;
    building_thumnail: string;
  };
}
