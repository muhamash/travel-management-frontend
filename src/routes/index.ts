import { createBrowserRouter } from "react-router";
import App from "../App";
import ABoutPage from "../pages/about/Page";
import LoginPage from "../pages/login/page";
import NotFoundPage from "../pages/notFound/page";

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
        Component: LoginPage,
        path: "/login",
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