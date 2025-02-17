import * as React from "react";
import {
  ChartPie,
  Table2,
  List,
  GalleryVerticalEnd,
} from "lucide-react";

import { NavUser } from "@/components/SideBar/NavUser";
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
  useSidebar,
} from "@/components/ui/sidebar";
import SelfAvatar from "@/assets/images/SelfAvatar.jpg";
import { Link, useLocation } from "react-router-dom";
import useActiveItemStore from "@/zustand/activeItem/useActiveItemStore";
import { HOME_ROUTE, TASK_LIST_ROUTE, TASK_TABLE_ROUTE } from "@/configs/path-consts";
import useAuthStore from "@/zustand/auth/useAuthStore";
import { useTranslation } from "react-i18next";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { t } = useTranslation();
  const data = React.useMemo(() => ({
    navMain: [
      { title: t("sidebar.title.home"), icon: ChartPie, url: HOME_ROUTE, isActive: true },
      { title: t("sidebar.title.taskTable"), icon: Table2, url: TASK_TABLE_ROUTE, isActive: false },
      { title: t("sidebar.title.taskList"), icon: List, url: TASK_LIST_ROUTE, isActive: false },
    ],
  }), [t]);

  const userData = useAuthStore((state) => state.userData);
  const sidebarData = {
    name: userData?.name,
    email: userData?.email,
    avatar: SelfAvatar,
  }
  const { setOpen } = useSidebar();
  const location = useLocation();
  const currentPathname = location.pathname;

  const { activeItem, setActiveItem } = useActiveItemStore();

  React.useLayoutEffect(() => {
    const item = data.navMain.find((item) => item.url === currentPathname);
    if (item) {
      setActiveItem(item);
    }
  }, [currentPathname, setActiveItem, data]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={HOME_ROUTE}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary-light-500 text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-1 leading-none">
                  <span className="font-semibold">Tasktify</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex flex-1 flex-col justify-start">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.url}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData} />
      </SidebarFooter>
    </Sidebar>
  );
}
