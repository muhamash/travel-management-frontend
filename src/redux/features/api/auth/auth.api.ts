import { baseApi } from "../../../baseApi";

const authApi = baseApi.injectEndpoints( {
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
        sendOtp: builder.mutation<null, { email: string }>( {
            query: ( userInfo ) => ( {
                url: "/otp/send",
                method: "POST",
                data: userInfo
            } )
        } )
    } )
} );

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } = authApi;