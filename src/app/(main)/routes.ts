'use client';

import productsRoutes from './products/routes';

export default [
  ...productsRoutes,
  {
    title: '매출관리',
    url: '/sales',
  },
  {
    title: '광고분석',
    url: '/ads',
  },
  {
    title: '수익분석',
    url: '/profits',
  },
];
