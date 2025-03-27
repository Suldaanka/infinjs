"use client"

import * as React from "react"
import {
  Users,
  House,
  BedDouble,
  Settings2,
  Utensils,
  LayoutDashboard,
  CircleDollarSign
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Rooms",
      url: "/dashboard/rooms",
      icon: House,
      isActive: true,
    },
    {
      title: "Reservations",
      url: "/dashboard/reservations",
      icon: BedDouble,
      isActive: true,
    },
    {
      title: "Restaurent",
      url: "#",
      icon: Utensils,
      hasDropdown: true,
      items: [
        {
          title: "Menu",
          url: "/dashboard/menu",
        },
        {
          title: "Tables",
          url: "/dashboard/tables",
        },
        {
          title: "Orders",
          url: "/dashboard/orders",
        },
      ],
    },
    {
      title: "Expenses",
      url: "/dashboard/expenses",
      icon: CircleDollarSign,
      hasDropdown: false
    },
    {
      title: "Employees",
      url: "/dashboard/employees",
      icon: Users,
      hasDropdown: false
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
