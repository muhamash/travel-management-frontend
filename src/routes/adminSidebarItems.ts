import AnalyticsPage from "../pages/analytics/page";

export const adminSidebarItem = [
    {
        title: "Getting Started",
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
        title: "Manage travels",
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