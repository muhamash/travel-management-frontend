import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import DashboardLayout from "../layouts/AdminLayouts";
import LoginPage from "../pages/login/page";
import NotFoundPage from "../pages/notFound/page";
import RegisterPage from "../pages/register/page";
import VerifyPage from "../pages/verify/page";
import { generateRoutes } from "../utils/genrateRoutes";
import { withAuth } from "../utils/withAuth";
import { adminSidebarItem } from "./adminSidebarItems";
import { userSidebarItem } from "./userSidebarItems";

const ABoutPage = lazy( () => import( "../pages/about/Page" ) );

export const appRouter = createBrowserRouter( [
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: withAuth(ABoutPage, null),
                path: "/about"
            }
        ]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children: [
            {
                index: true,
                element: React.createElement( Navigate, { to: "/admin/analytics" } ),
            },
            ...generateRoutes( adminSidebarItem )
        ]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children: [ {
            index: true,
            element: React.createElement( Navigate, { to: "/user/booking" } ),
        },
            ...generateRoutes( userSidebarItem )
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
] );