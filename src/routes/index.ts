import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardLayout from "../layouts/AdminLayouts";
import ABoutPage from "../pages/about/Page";
import LoginPage from "../pages/login/page";
import NotFoundPage from "../pages/notFound/page";
import RegisterPage from "../pages/register/page";
import VerifyPage from "../pages/verify/page";
import { generateRoutes } from "../utils/genrateRoutes";
import { adminSidebarItem } from "./adminSidebarItems";
import { userSidebarItem } from "./userSidebarItems";

export const appRouter = createBrowserRouter( [
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: ABoutPage,
                path: "/about"
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            ...generateRoutes(adminSidebarItem)
        ]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [
            ...generateRoutes(userSidebarItem)
        ]
    },
    {
        Component: LoginPage,
        path: "/login",
    },
    {
        Component: RegisterPage,
        path: "/register",
    },
    {
        Component: VerifyPage,
        path: "/verify",
    },
    {
        Component: NotFoundPage,
        path: "*"
    }
    // {
    //     Component: AdminLayouts,
    //     path: '/admin',
    //     children:
    //         [
    //             {
    //                 Component: page,
    //                 path: "/admin/analytics"
    //             }
    //         ]
    // }
] );