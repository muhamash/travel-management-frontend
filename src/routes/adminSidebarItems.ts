import AddTourPage from "../pages/addTour/page";
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
                url: "/admin/add-tour",
                component: AddTourPage
            },
        ],
    },
    
];