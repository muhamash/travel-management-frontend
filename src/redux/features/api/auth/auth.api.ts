import { baseApi } from "../../../baseApi";

export const authApi = baseApi.injectEndpoints( {
    endpoints: ( builder ) => ( {
        register: builder.mutation( {
            query: ( userInfo ) => ( {
                url: "/user/register",
                method: "POST",
                data: userInfo
            } )
        } ),
        login: builder.mutation( {
            query: ( userInfo ) => ( {
                url: "/auth/login",
                method: "POST",
                data: userInfo
            } )
        } ),
        logout: builder.mutation( {
            query: () => ( {
                url: "/auth/logout",
                method: "POST",
            } ),
            invalidatesTags: ["USER"]
        } ),
        sendOtp: builder.mutation<null, { email: string }>( {
            query: ( userInfo ) => ( {
                url: "/otp/send",
                method: "POST",
                data: userInfo
            } )
        } ),
        userData: builder.query( {
            query: () =>
            ( {
                url: "/user/getMe",
                method: "GET",
                        
            } ),
            providesTags: ["USER"]
        } )
    } )
} );

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation, useUserDataQuery, useLogoutMutation } = authApi;