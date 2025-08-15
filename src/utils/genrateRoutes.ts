

export const generateRoutes = ( sidebar ) =>
{
    return sidebar.map( section => section.items.map( route =>
    ( {
        path: route.url,
        Component: route.component
    } ) ) );
}