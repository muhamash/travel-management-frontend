import { createBrowserRouter } from "react-router";
import App from "../App";
import AdminLayouts from "../layouts/AdminLayouts";
import ABoutPage from "../pages/about/Page";
import AnalyticsPage from "../pages/analytics/page";
import LoginPage from "../pages/login/page";
import NotFoundPage from "../pages/notFound/page";
import RegisterPage from "../pages/register/page";
import VerifyPage from "../pages/verify/page";

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
        Component: AdminLayouts,
        path: "/admin",
        children: [
            {
                Component: AnalyticsPage,
                path: '/admin/analytics'
            }
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