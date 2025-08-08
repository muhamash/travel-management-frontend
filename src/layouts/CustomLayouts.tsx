import type { ReactNode } from "react";
import Footer from "../components/layouts/Footer";
import Nav from "../components/layouts/Nav";

interface ICustomLayouts
{
    children: ReactNode;
}

const CustomLayouts = ( { children }: ICustomLayouts ) =>
{
    return (
        <div>
            <Nav />
            {children}
            <Footer/>
        </div>
    );
};

export default CustomLayouts;