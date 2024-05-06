import styles from './NavBar.module.css'
import React, {FC, useRef} from "react";
import {NavLink} from "react-router-dom";
import {AddModal} from "../add-modal/AddModal";

//TODO add bottom margin
export const Navbar: FC = () => {
    const ref = useRef<HTMLDialogElement>(null);

    const navLinkFactory = (to: string, text: string) => {
        return (
                <NavLink to={to} className={(active) => active.isActive ? styles.active : ''}>
                    {text}
                </NavLink>
        );
    };

    return (
        <nav className={styles.navbar}>
            <img src="/assets/icons/logo.svg" className={styles.logo} alt="logo"/>

            <ul className={styles.navbarLinks}>
                <li>{navLinkFactory('/', 'Home')}</li>
                <li>{navLinkFactory('/browse', 'Find offers')}</li>
                <li><a href="#" onClick={() =>  ref.current?.showModal()}>Add new offers</a></li>
                <li>{navLinkFactory('/my-offers', 'My offers')}</li>
                <li>{navLinkFactory('/favorite', 'Favorites')}</li>
                <button className="button primary">Log in</button>
            </ul>
            <button className="button primary hidden">Menu</button>
            <AddModal ref={ref}/>
        </nav>
    );
};
