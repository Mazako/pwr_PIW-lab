import {FC, useEffect} from "react";
import {Navbar} from "../../components/navbar/NavBar";
import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {containerIds} from "../../utils/ToastifyContainerIds";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../app/Store";
import {loggedInSelector, updateLoggedIn} from "../../features/LoggedInSlice";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const Layout: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const loggedIn = useSelector(loggedInSelector);
    const auth = getAuth();

    // It's first component to render, so here's mechanism to check that user is logged in or not
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(updateLoggedIn(true));
            } else {
                dispatch(updateLoggedIn(false));
            }
        });

    }, [auth, dispatch]);

    if (loggedIn === null) {
        return <></>;
    }

    return (
        <main>
            <Navbar/>
            <Outlet/>
            <ToastContainer containerId={containerIds.main} position='bottom-right'/>
        </main>
    );
};
