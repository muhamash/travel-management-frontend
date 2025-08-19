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
                data: divisionData
            } ),
            providesTags: ["DIVISION"]
        } ),
        getDivision: builder.query( {
            query: () => ( {
                url: "/division",
                method: "GET"
            } ),
            transformResponse: ( response ) => response.data,
        } ),

        addTour: builder.mutation( {
            query: ( tourData ) => ( {
                url: '/tour/create-tour',
                method: "POST",
                data: tourData
            } ),
            providesTags:["TOUR"]
        })
    } )
} );

export const { useAddTourTypeMutation, useGetTourTypesQuery, useRemoveTourTypeMutation, useAddDivisionMutation, useGetDivisionQuery, useAddTourMutation } = tourApi;