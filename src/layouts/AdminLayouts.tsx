import { AppSidebar } from "@/components/app-sidebar";
import
    {
        SidebarInset,
        SidebarProvider,
        SidebarTrigger,
    } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { ModeToggle } from "../components/layouts/ThemeToggler";

export default function DashboardLayout ()
{
     
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-accent justify-between">
                    <SidebarTrigger className="-ml-1" />
                    {/* <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    /> */}

                    {/* no need
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb> */}

                    <ModeToggle />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 bg-ring ">
                    <Outlet />
                </div>

            </SidebarInset>
        </SidebarProvider>
    );
};