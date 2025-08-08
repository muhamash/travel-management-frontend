import { createBrowserRouter } from "react-router";
import App from "../App";
import Page from "../pages/about/Page";

export const appRouter = createBrowserRouter( [
    {
        Component: App,
        path: "/",
        children: [
            {
                Component: Page,
                path: "/about"
            }
        ]
    },
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