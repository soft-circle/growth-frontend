import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const menus = [
  {
    title: '상품마스터',
    url: '/products',
  },
  {
    title: '매출관리',
    url: '/sales',
  },
  {
    title: '광고분석',
    url: '/ads',
  },
  {
    title: '마진분석',
    url: '/margins',
  },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        RMS
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                menus.map((menu) => (
                  <SidebarMenuItem
                    key={menu.url}
                  >
                    <SidebarMenuButton asChild>
                      <a href={menu.url}>
                        {menu.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
