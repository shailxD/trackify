import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ProtectedRoute } from "@/components/route-guards";
import useAuthStore from "@/store/auth-store";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarContent />
      </SidebarProvider>
    </ProtectedRoute>
  );
}

function SidebarContent() {
  const { open } = useSidebar();
  const { user } = useAuthStore();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger
            className={cn(
              "-ml-1",
              open ? "cursor-e-resize" : "cursor-w-resize"
            )}
          />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex gap-1.5">
            <h2 className="italic">Hello,</h2>
            <h2 className="font-semibold italic">{user?.name}</h2>
          </div>
        </div>

        <ThemeSwitcher />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Outlet />
      </div>
    </SidebarInset>
  );
}
