import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import DashboardLayout from "../layouts/AdminLayouts";
import LoginPage from "../pages/login/page";
import NotFoundPage from "../pages/notFound/page";
import RegisterPage from "../pages/register/page";
import UnAuthorizedPage from "../pages/unauthorized/page";
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
        Component: withAuth(DashboardLayout, "ADMIN"),
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
        Component: withAuth(DashboardLayout, "USER"),
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
        Component: UnAuthorizedPage,
        path: "/unauthorized",
    },
    {
        Component: NotFoundPage,
        path: "*"
    }
] );