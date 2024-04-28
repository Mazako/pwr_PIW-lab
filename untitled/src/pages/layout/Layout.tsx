import {FC} from "react";
import {Navbar} from "../../components/navbar/NavBar";
import {Outlet} from "react-router";

export const Layout: FC = () => {
    return(
        <main>
        <Navbar />
        <Outlet />
        </main>
    )
}
