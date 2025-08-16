import { baseApi } from './../../../baseApi';

export const tourApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        addTourType: builder.mutation( {
            query: ( tourTypeName: string ) => ( {
                url: '/tour/create-tour-type',
                method: "POST",
                data: tourTypeName
            } ),
            invalidatesTags: [ "TOUR" ],
        } ),
        getTourTypes: builder.query( {
            query: () => ( {
                url: "/tour/tour-types",
                method: "GET"
            } ),
            providesTags: [ "TOUR" ],
            transformResponse: ( response ) => response.data,
        } ),
        removeTourType: builder.mutation( {
            query: ( tourTypeId: string ) => ( {
                url: `/tour/tour-types/${ tourTypeId }`,
                method: "DELETE",
            } ),
            invalidatesTags: [ "TOUR" ],
        } ),

        addDivision: builder.mutation( {
            query: ( divisionData ) => ( {
                url: "/division/create",
                method: "POST",
                data:  divisionData
            })
        }),
    } )
} );

export const { useAddTourTypeMutation, useGetTourTypesQuery, useRemoveTourTypeMutation, useAddDivisionMutation } = tourApi;