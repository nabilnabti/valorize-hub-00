
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarProvider
      onCollapseChange={(collapsed) => setIsCollapsed(collapsed)}
      defaultCollapsed={false}
    >
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-16 items-center border-b px-6">
            <SidebarTrigger />
            <div className="ml-4 flex-1 flex items-center justify-between">
              <h1 className="text-lg font-semibold">ValorizeHub</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Valorisez vos stocks dormants
                </span>
              </div>
            </div>
          </div>
          <div className={cn("px-6 py-6", isCollapsed ? "ml-20" : "ml-64")}>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
