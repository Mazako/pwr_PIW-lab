import {FC} from "react";

import styles from './Header.module.css';

const Header: FC<{title: string}> = ({title}) => {
    return (
        <section className={styles.header}>
            {title}
        </section>
    );
}
