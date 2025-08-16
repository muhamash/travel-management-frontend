import * as React from "react"

import
  {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"
import NavIcon from "../assets/icons/NavIcon"
import { useUserDataQuery } from "../redux/features/api/auth/auth.api"
import { getSidebarItems } from "../utils/getSidebarItems"


export function AppSidebar ( { ...props }: React.ComponentProps<typeof Sidebar> )
{

  const { data: userData } = useUserDataQuery();
  const location = useLocation();
  const data = {
    navMain: getSidebarItems(userData?.data?.role)
  }

  console.log( data.navMain );
  console.log( location.pathname )
  
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex w-full flex-col bg-accent">
       <Link to="/"> <NavIcon /></Link>
      </SidebarHeader>
      <SidebarContent className="bg-ring">
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link className="text-muted-foreground" to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
