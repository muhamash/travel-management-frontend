import z from "zod";

export const TourSchema = z
    .object( {
        title: z.string().min( 3, 'Title is too short' ),
        description: z.string().min( 3, 'Please add a short description' ),
        // images: z.array( z.string().url( 'Must be a valid URL' ) ).min( 1, 'Add at least one image' ).optional(),
        location: z.string().min( 2, 'Location is required' ),
        costFrom: z
            .number( { invalid_type_error: 'Cost must be a number' } )
            .nonnegative( 'Cost cannot be negative' )
            .int( 'Cost must be a whole number' ),
        startDate: z
            .date( { required_error: "Start date is required" } )
            .transform( ( d ) => d.toISOString() ),
        endDate: z
            .date( { required_error: "End date is required" } )
            .transform( ( d ) => d.toISOString() ),

        included: z.array( z.string().min( 1 ) ).min( 1, 'Add at least one item' ),
        excluded: z.array( z.string().min( 1 ) ).min( 0 ),
        amenities: z.array( z.string().min( 1 ) ).min( 1, 'Add at least one amenity' ),
        tourPlan: z.array( z.string().min( 1 ) ).min( 1, 'Add at least one itinerary item' ),
        maxGuest: z
            .number( { invalid_type_error: 'Max guests must be a number' } )
            .int( 'Must be an integer' )
            .positive( 'Must be greater than 0' ),
        minAge: z
            .number( { invalid_type_error: 'Minimum age must be a number' } )
            .int( 'Must be an integer' )
            .nonnegative( 'Cannot be negative' ),
        division: z.string().min( 1, "Division is required" ),
        tourType: z.string().min( 1, "Tour type is required" ),
    } )
    .refine( ( data ) => data.endDate >= data.startDate, {
        message: 'End date cannot be before start date',
        path: [ 'endDate' ],
    } );