import { role } from "../constants/role";
import { adminSidebarItem } from "../routes/adminSidebarItems";
import { userSidebarItem } from "../routes/userSidebarItems";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";

export const getSidebarItems = (userRole: TRole) =>
{
    switch (  userRole )
    {
        case role.superAdmin:
            return [ ...adminSidebarItem, ...userSidebarItem ];
        case role.admin:
            return [ ...adminSidebarItem ];
        case role.user:
            return [ ...userSidebarItem ];
        default:
            return [];
    }
}