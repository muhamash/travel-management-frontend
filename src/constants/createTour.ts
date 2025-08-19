import type { TourSchema } from "../pages/tour/addTour/tour.zod";

export type TourFormValues = z.infer<typeof TourSchema>

export const defaultTourValues: TourFormValues = {
    title: 'thakurgaon tour',
    description: 'Enjoy.',
    images: [ 'https://example.com/beach.jpg' ],
    location: "Cox's dazar",
    costFrom: 6500,
    startDate: new Date( '2025-08-01T00:00:00' ),
    endDate: new Date( '2025-08-05T00:00:00' ),
    included: [ 'Transport', 'Meals' ],
    excluded: [ 'Personal expenses' ],
    amenities: [ 'Hotel', 'Tour Guide' ],
    tourPlan: [ 'Day 1: Arrival', 'Day 2: Beach', 'Day 3: Departure' ],
    maxGuest: 20,
    minAge: 12,
    division: "",
    tourType: ""
};