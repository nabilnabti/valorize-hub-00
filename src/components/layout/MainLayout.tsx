
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
      defaultOpen={!isCollapsed}
      onOpenChange={(open) => setIsCollapsed(!open)}
    >
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-16 items-center border-b px-6 bg-card/70 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger />
            <div className="ml-4 flex-1 flex items-center justify-between">
              <h1 className="text-lg font-semibold">
                <span className="text-primary">RE</span>
                <span className="text-eco-600">ENX</span>
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Valorisez vos stocks dormants
                </span>
              </div>
            </div>
          </div>
          <div className={cn("p-8", isCollapsed ? "ml-20" : "ml-64")}>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
