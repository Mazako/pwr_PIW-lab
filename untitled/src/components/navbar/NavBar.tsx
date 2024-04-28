import styles from './NavBar.module.css'
import React, {FC} from "react";

export const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <img src="assets/icons/logo.svg" className={styles.logo} alt="logo"/>

            <ul className={styles.navbarLinks}>
                <li><a href="#">Home</a></li>
                <li><a href="#">Find offers</a></li>
                <li><a href="#">Add new offers</a></li>
                <li><a href="#">My offers</a></li>
                <li><a href="#">Favorites</a></li>
                <button className="button primary">Log out</button>
            </ul>
            <button className="button primary hidden">Menu</button>
        </nav>
    );
};
