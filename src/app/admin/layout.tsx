
'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Package, ShoppingCart, LineChart, Settings } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/shared/header";
import { useSidebar } from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";

function AdminSidebar() {
    const { open, toggleSidebar } = useSidebar();
    return (
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Admin</h2>
             </div>
             {open && (
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="ml-auto"
                    onClick={toggleSidebar}
                >
                    <SidebarTrigger />
                </Button>
             )}
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/admin/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Products">
                  <Link href="/admin/products">
                    <Package className="h-4 w-4" />
                     <span>Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Orders">
                  <Link href="/admin/orders">
                    <ShoppingCart className="h-4 w-4" />
                     <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics">
                  <Link href="/admin/analytics">
                    <LineChart className="h-4 w-4" />
                     <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <SidebarMenu>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                        <Link href="#">
                            <Settings className="h-4 w-4" />
                             <span>Settings</span>
                        </Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
    )
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AdminSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 ease-in-out group-data-[state=expanded]/sidebar-wrapper:sm:pl-[var(--sidebar-width)] group-data-[state=collapsed]/sidebar-wrapper:sm:pl-[var(--sidebar-width-icon)]">
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
