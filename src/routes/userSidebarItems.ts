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
                Component: AnalyticsPage,
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
                Component: BookingPage
            },
            {
                title: "See booking details",
                url: "/user/booking-details",
                Component: BookingDetailsPage
            },
        ],
    },
    
];