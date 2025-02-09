'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import mainRoutes from '@/app/routes';
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((path) => !!path);
  const paths = segments.map((_, i) => segments.slice(0, i + 1).reduce((acc, cur) => `${acc}/${cur}`, ''));

  return (
    <BaseBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {
          paths.map((path, i) => (
            i < paths.length - 1
              ? (
                <React.Fragment key={path}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={path}>
                      {mainRoutes.filter(({ url }) => url === path)[0].title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              )
              : (
                <BreadcrumbPage key={path}>
                  {mainRoutes.filter(({ url }) => url === path)[0].title}
                </BreadcrumbPage>
              )
          ))
        }
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
}
