

import AnalyticsPage from "../pages/analytics/page";

export const userSidebarItem = [
    {
        title: "Bookings",
        url: "#",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                component: AnalyticsPage,
            },
        ],
    },
    {
        title: "Manage bookings",
        url: "#",
        items: [
            {
                title: "Add tour",
                url: "#",
            },
            {
                title: "Add tour type",
                url: "#",
            },
        ],
    },
    
];