import React from 'react';
import {SidebarProvider} from "@/src/components/ui/sidebar";
import {ThemeProvider} from "@/src/providers/theme-provider";

function Providers({children}: { children: React.ReactNode }) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default Providers;
