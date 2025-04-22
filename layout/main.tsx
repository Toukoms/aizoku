import React from 'react';
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import Header from "@/layout/header";
import Footer from "@/layout/footer";

const MainLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <div className="w-full h-full bg-muted mx-auto grid grid-rows-[auto_1fr_auto]">
          <Header/>
          {children}
          <Footer/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
