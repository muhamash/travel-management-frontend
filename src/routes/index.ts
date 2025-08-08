import { createBrowserRouter } from "react-router";
import App from "../App";
import AdminLayouts from "../layouts/AdminLayouts";
import Page from "../pages/about/Page";
import page from "../pages/analytics/page";

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
    {
        Component: AdminLayouts,
        path: '/admin',
        children:
            [
                {
                    Component: page,
                    path: "/admin/analytics"
                }
            ]
    }
] );