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
        <div className="min-h-screen flex flex-col">
            <Nav />
            <div className="grow-1">
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default CustomLayouts;