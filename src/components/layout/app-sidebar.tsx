"use client";

import * as React from "react";
import { LayoutDashboard, ReceiptText } from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

const data = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Expenses",
    url: "/expenses",
    icon: ReceiptText,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavMain data={data} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
