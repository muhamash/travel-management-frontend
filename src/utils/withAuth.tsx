

export const withAuth = ( Component, requiredRole ) =>
{
    return function AuthWrapper ()
    {
        return <Component/>
    }
};