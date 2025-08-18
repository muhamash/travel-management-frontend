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
                <header className="flex h-16 shrink-0 items-center gap-2 border-b-1 border-white/20 px-4
             bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30
             backdrop-blur-md backdrop-saturate-150 shadow-lg fixed w-full ">
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
                <div className="flex flex-1 flex-col gap-4 p-4 bg-ring py-10">
                    <Outlet />
                </div>

            </SidebarInset>
        </SidebarProvider>
    );
};