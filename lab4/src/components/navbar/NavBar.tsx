import styles from './NavBar.module.css'
import React, {FC, useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {AddModal} from "../add-modal/AddModal";
import {useNavigate} from "react-router";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {toast} from "react-toastify";
import {containerIds} from "../../utils/ToastifyContainerIds";

export const Navbar: FC = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const navLinkFactory = (to: string, text: string) => {
        return (
                <NavLink to={to} className={(active) => active.isActive ? styles.active : ''}>
                    {text}
                </NavLink>
        );
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUserLoggedIn(true)
            } else {
                setUserLoggedIn(false);
            }
        })
    }, [auth]);

    const handleLogout = async () => {
        await signOut(auth);
        toast('Logged out', {containerId: containerIds.main});
    }


    const logInLogOutButton = () => {
        if (!userLoggedIn) {
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
                {logInLogOutButton()}
            </ul>
            <button className="button primary hidden">Menu</button>
            <AddModal ref={ref}/>
        </nav>
    );
};
