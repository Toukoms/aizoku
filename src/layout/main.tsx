import React from 'react';
import {SidebarInset, SidebarProvider} from "@/src/components/ui/sidebar";
import {AppSidebar} from "@/src/components/app-sidebar";
import Header from "@/src/layout/header";
import Footer from "@/src/layout/footer";
import {Toaster} from "@/src/components/ui/sonner";

const MainLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <div className="w-full h-full bg-muted mx-auto grid grid-rows-[auto_1fr_auto]">
          <Header/>
          {children}
          <Toaster position={"top-center"}/>
          <Footer/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
