import useAuthStore from "@/zustand/auth/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

import React, { useEffect } from "react";
import { AppSidebar } from "@/components/SideBar/AppSideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import useActiveItemStore from "@/zustand/activeItem/useActiveItemStore";
import { EXPIRED_SHORT_AT_INTERVAL } from "@/configs/helper";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import { LOG_IN_ROUTE } from "@/configs/path-consts";
import { ResponsiveContainer } from "recharts";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

const MainLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const checkExpiration = useAuthStore((state) => state.checkExpiration);
  const { activeItem } = useActiveItemStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkExpiration();
    }, EXPIRED_SHORT_AT_INTERVAL);

    return () => clearInterval(intervalId);
  }, [checkExpiration]);

  if (!isAuthenticated) {
    return <Navigate to={LOG_IN_ROUTE} />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "12rem",
          "--sidebar-width-mobile": "12rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <ResponsiveContainer className="w-full h-full">
        <SidebarInset className="flex flex-col w-full h-full">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 w-full justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-body3 lg:text-body4">{activeItem.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="flex items-center h-fit w-fit gap-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </ResponsiveContainer>
    </SidebarProvider>
  );
};

export default MainLayout;
