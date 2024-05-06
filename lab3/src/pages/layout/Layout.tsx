import {FC} from "react";
import {Navbar} from "../../components/navbar/NavBar";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {containerIds} from "../../utils/ToastifyContainerIds";

export const Layout: FC = () => {
    return (
        <main>
            <Navbar/>
            <Outlet/>
            <ToastContainer containerId={containerIds.main} position='bottom-right'/>
        </main>
    );
};
