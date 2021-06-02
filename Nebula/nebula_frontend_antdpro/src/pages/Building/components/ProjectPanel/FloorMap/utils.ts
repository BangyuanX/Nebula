export const calculatePolygonGravityCeneter = (exteriorBoundary: [number, number, number][]) => {
  let area = 0.0;
  let gravityX = 0.0;
  let gravityY = 0.0;
  for (let i = 0; i < exteriorBoundary.length; i += 1) {
    const x = exteriorBoundary[i][0];
    const y = exteriorBoundary[i][1];
    const nextX = exteriorBoundary[(i + 1) % exteriorBoundary.length][0];
    const nextY = exteriorBoundary[(i + 1) % exteriorBoundary.length][1];

    const tempArea = (nextX * y - nextY * x) / 2.0;

    area += tempArea;

    gravityX += (tempArea * (x + nextX)) / 3;
    gravityY += (tempArea * (y + nextY)) / 3;
  }

  gravityX /= area;
  gravityY /= area;

  return { gravityX, gravityY };
};

export const colorSchema = {
  normal: {
    WORK: '#7dd2e3',
    MEET: '#7de8bf',
    OPERATE: '#d1d1d1',
    SERVE: '#ffc85a',
    WE: '#ffc85a',
    CIRCULATE: '#fff7df',
    WASH: '#a3a3a3',
  },
  occupancy: {
    WORK0: '#7dd2e3',
    WORK1: '#43658b',
    MEET: '#7de8bf',
    OPERATE: '#e2e2e2',
    SERVE: '#ffc85a',
    WE: '#ffc85a',
    CIRCULATE: '#fff7df',
    WASH: '#a3a3a3',
  },
  expiration: {
    WORK0: '#7dd2e3',
    WORK1: '#ee6f57',
    MEET: '#7de8bf',
    OPERATE: '#e2e2e2',
    SERVE: '#ffc85a',
    WE: '#ffc85a',
    CIRCULATE: '#fff7df',
    WASH: '#a3a3a3',
  },
};

export const roomTexture = {
  'MEN WC': 'https://api.c3plus.top/media/images/origin/wc_m2x.png',
  'W RESTROOM': 'https://api.c3plus.top/media/images/origin/wc_f2x.png',
  'WOMEN WC': 'https://api.c3plus.top/media/images/origin/wc_f2x.png',
  RESTROOM: 'https://api.c3plus.top/media/images/origin/wc_u2x.png',
  UNISEX: 'https://api.c3plus.top/media/images/origin/wc_u2x.png',
  'VIP LOUNGE': 'https://api.c3plus.top/media/images/origin/lounge.png',
  'MINI LOUNGE': 'https://api.c3plus.top/media/images/origin/lounge.png',
  LOUNGE: 'https://api.c3plus.top/media/images/origin/lounge.png',
  IT: 'https://api.c3plus.top/media/images/origin/IT_room2x.png',
  MAIL: 'https://api.c3plus.top/media/images/origin/mail_room2x.png',
  'PHONE BOOTH': 'https://api.c3plus.top/media/images/origin/phone_booth2x.png',
  Cafe: 'https://api.c3plus.top/media/images/origin/pantry2x.png',
  PANTRY: 'https://api.c3plus.top/media/images/origin/pantry2x.png',
  PRINTER: 'https://api.c3plus.top/media/images/origin/printer2x.png',
  STOR: 'https://api.c3plus.top/media/images/origin/storage2x.png',
  'STAIR FOYER': 'https://api.c3plus.top/media/images/origin/stair.png',
  'MOTHER RM': 'https://api.c3plus.top/media/images/origin/motherroom2x.png',
  MOP: 'https://api.c3plus.top/media/images/origin/maintenance2x.png',
  MECH: 'https://api.c3plus.top/media/images/origin/mechanical2x.png',
  ADA: 'https://api.c3plus.top/media/images/origin/wc_ada.png',
  'COMMUNITY BAR': 'https://api.c3plus.top/media/images/origin/we_reception.png',
};
