import React from 'react';
import {SidebarInset} from "@/src/components/ui/sidebar";
import {AppSidebar} from "@/src/components/app-sidebar";
import Header from "@/src/layout/header";
import Footer from "@/src/layout/footer";
import {Toaster} from "@/src/components/ui/sonner";
import Providers from "@/src/layout/providers";

const MainLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <Providers>
      <AppSidebar/>
      <SidebarInset>
        <div className="w-full h-screen overflow-hidden bg-muted mx-auto grid grid-rows-[auto_1fr_auto]">
          <Header/>
          {children}
          <Toaster position={"top-center"}/>
          <Footer/>
        </div>
      </SidebarInset>
    </Providers>
  );
};

export default MainLayout;
