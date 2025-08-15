

import AnalyticsPage from "../pages/analytics/page";
import BookingPage from "../pages/booking/page";
import BookingDetailsPage from "../pages/bookingDetails/page";

export const userSidebarItem = [
    {
        title: "Bookings",
        url: "#",
        items: [
            {
                title: "Analytics",
                url: "/user/analytics",
                component: AnalyticsPage,
            },
        ],
    },
    {
        title: "Manage bookings",
        url: "#",
        items: [
            {
                title: "Book a travel slot",
                url: "/user/booking",
                component: BookingPage
            },
            {
                title: "See booking details",
                url: "/user/booking-details",
                component: BookingDetailsPage
            },
        ],
    },
    
];