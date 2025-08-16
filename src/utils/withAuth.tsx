import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { useUserDataQuery } from "../redux/features/api/auth/auth.api";
import type { TRole } from "./getSidebarItems";


export const withAuth = ( Component: ComponentType, requiredRole?: TRole ) =>
{
    return function AuthWrapper ()
    {
        const { data, isLoading } = useUserDataQuery();

        if( !data?.data?.email && !isLoading ){
            return <Navigate to="/login"/>
        }

        if ( requiredRole && !isLoading && requiredRole !== data?.data?.role )
        {
            return <Navigate to="/unauthorized"/>
        }

        return <Component/>
    }
};