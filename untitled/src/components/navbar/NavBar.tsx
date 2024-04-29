import styles from './NavBar.module.css'
import React, {FC} from "react";
import {NavLink} from "react-router-dom";

//TODO add bottom margin
export const Navbar: FC = () => {
    const navLinkFactory = (to: string, text: string) => {
        return (
                <NavLink to={to} className={(active) => active.isActive ? styles.active : ''}>
                    {text}
                </NavLink>
        );
    }

    return (
        <nav className={styles.navbar}>
            <img src="/assets/icons/logo.svg" className={styles.logo} alt="logo"/>

            <ul className={styles.navbarLinks}>
                <li>{navLinkFactory('/', 'Home')}</li>
                <li>{navLinkFactory('/browse', 'Find offers')}</li>
                <li><a href="#">Add new offers</a></li>
                <li>{navLinkFactory('/my-offers', 'My offers')}</li>
                <li>{navLinkFactory('/favorite', 'Favorites')}</li>
                <button className="button primary">Log out</button>
            </ul>
            <button className="button primary hidden">Menu</button>
        </nav>
    );
};
