import React from 'react';
import {SidebarInset, SidebarProvider} from "@/src/components/ui/sidebar";
import {AppSidebar} from "@/src/components/app-sidebar";
import Header from "@/src/layout/header";
import Footer from "@/src/layout/footer";
import {Toaster} from "@/src/components/ui/sonner";
import {ThemeProvider} from "next-themes";

const MainLayout = ({children}: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
          <div className="w-full h-screen overflow-hidden bg-muted mx-auto grid grid-rows-[auto_1fr_auto]">
            <Header/>
            {children}
            <Toaster position={"top-center"}/>
            <Footer/>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
