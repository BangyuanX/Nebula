export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/building-list',
    // name: 'buildingList',
    component: './BuildingList',
  },
  {
    // name: 'building',
    // icon: 'shop',
    path: '/building/:buildingId',
    component: './Building/[buildingId]',
  },
  {
    // name: 'project',
    // icon: 'shop',
    path: '/project/:projectId',
    component: './Project/[projectId]',
  },
  {
    path: '/',
    redirect: '/building-list',
  },
  {
    component: './404',
  },
];
