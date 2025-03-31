
import { 
  BarChart, 
  Upload, 
  ListChecks, 
  Users, 
  PieChart, 
  Home, 
  Settings 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  {
    title: "Accueil",
    icon: Home,
    href: "/"
  },
  {
    title: "Tableau de bord",
    icon: BarChart,
    href: "/dashboard"
  },
  {
    title: "Import de stocks",
    icon: Upload,
    href: "/upload"
  },
  {
    title: "Recommandations",
    icon: ListChecks,
    href: "/recommendations"
  },
  {
    title: "Matching",
    icon: Users,
    href: "/matching"
  },
  {
    title: "Reporting",
    icon: PieChart,
    href: "/reporting"
  }
];

const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <div className="flex items-center justify-center gap-2 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-valorize-500">
            <span className="text-xl font-bold text-white">V</span>
          </div>
          <span className="text-xl font-bold text-white">ValorizeHub</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      className={cn("w-full justify-start", isActive ? "bg-sidebar-accent" : "")}
                      asChild
                    >
                      <Link to={item.href} className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-valorize-200">
              <img src="https://avatars.githubusercontent.com/u/124599?v=4" alt="User" className="rounded-full" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Utilisateur</p>
            </div>
          </div>
          <Settings className="h-5 w-5 text-white opacity-60 hover:opacity-100 cursor-pointer" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
