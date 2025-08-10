import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envString } from '../lib/envString';

export const baseApi = createApi( {
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery( { baseUrl: envString.baseUrl } ),
    endpoints: () =>
    ( {
        
    } )
} );