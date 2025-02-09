import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Breadcrumb from '@/components/Breadcrumb';
import Partition from '@/components/Partition';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="py-2 px-2 w-full">
        <Partition valign="center" space={2}>
          <Partition.Side>
            <SidebarTrigger />
          </Partition.Side>
          <Partition.Main>
            <Breadcrumb />
          </Partition.Main>
        </Partition>
        {children}
      </main>
    </SidebarProvider>
  );
}
