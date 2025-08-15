import { adminSidebarItem } from "../routes/adminSidebarItems";
import { userSidebarItem } from "../routes/userSidebarItems";

export const getSidebarItems = (role) =>
{
    switch (  role )
    {
        case "SUPER_ADMIN":
            return [ ...adminSidebarItem, ...userSidebarItem ];
        case "ADMIN":
            return [ ...adminSidebarItem ];
        case "USER":
            return [ ...userSidebarItem ];
        default:
            return [];
    }
}