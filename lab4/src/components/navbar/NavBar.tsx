import styles from './NavBar.module.css'
import React, {FC, useRef} from "react";
import {NavLink} from "react-router-dom";
import {AddModal} from "../add-modal/AddModal";
import {useNavigate} from "react-router";
import {getAuth, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import {containerIds} from "../../utils/ToastifyContainerIds";
import {useSelector} from "react-redux";
import {loggedInSelector} from "../../features/LoggedInSlice";

export const Navbar: FC = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const loggedIn = useSelector(loggedInSelector);

    const navLinkFactory = (to: string, text: string) => {
        return (
                <NavLink to={to} className={(active) => active.isActive ? styles.active : ''}>
                    {text}
                </NavLink>
        );
    }

    const handleLogout = async () => {
        await signOut(auth);
        toast('Logged out', {containerId: containerIds.main});
    }


    const logInLogOutButton = () => {
        if (!loggedIn) {
            return <button className="button primary" onClick={() => navigate('/login')}>Log in</button>
        } else {
            return <button className="button primary" onClick={handleLogout}>Log out</button>
        }
    }

    return (
        <nav className={styles.navbar}>
            <img src="/assets/icons/logo.svg" className={styles.logo} alt="logo"/>

            <ul className={styles.navbarLinks}>
                <li>{navLinkFactory('/', 'Home')}</li>
                <li>{navLinkFactory('/browse', 'Find offers')}</li>
                <li><a href="#" onClick={() =>  ref.current?.showModal()}>Add new offers</a></li>
                <li>{navLinkFactory('/my-offers', 'My offers')}</li>
                <li>{navLinkFactory('/favorite', 'Favorites')}</li>
                <li>{navLinkFactory('/chat', 'Chat')}</li>
                {logInLogOutButton()}
            </ul>
            <button className="button primary hidden">Menu</button>
            <AddModal ref={ref}/>
        </nav>
    );
};
