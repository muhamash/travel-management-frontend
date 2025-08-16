import AnalyticsPage from "../pages/analytics/page";
import AddTourPage from "../pages/tour/addTour/page";
import AddTourType from "../pages/tour/addTourType/page";
import AddDivision from "../pages/tour/division/page";

export const adminSidebarItem = [
    {
        title: "Getting Started",
        url: "#",
        items: [
            {
                title: "Analytics",
                url: "/admin/analytics",
                Component: AnalyticsPage,
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
                Component: AddTourPage
            },
            {
                title: "Add tour type",
                url: "/admin/add-tour-type",
                Component: AddTourType
            },
            {
                title: "Add division",
                url: "/admin/add-division",
                Component: AddDivision
            },
        ],
    },
    
];