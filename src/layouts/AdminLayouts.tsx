import { Outlet } from "react-router";

// interface IAdminLayout
// {
//     children: ReactNode;
// }

const AdminLayouts = () => {
    return (
        <div>
            <h1>Admin layout!!</h1>
            <Outlet/>
        </div>
    );
};

export default AdminLayouts;