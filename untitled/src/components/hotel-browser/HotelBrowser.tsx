import {FC, ReactNode} from "react";
import styles from './HotelBrowser.module.css';

interface HotelBrowserProps {
    title: string,
    serachBarTitle: string,
    children: ReactNode

}

export const HotelBrowser: FC<HotelBrowserProps> = ({title, serachBarTitle, children}) => {
    return (
        <section className={styles.hotelCards}>
            <article className={styles.hotelCardsHeader}>
                {title}
            </article>
            <input className={styles.searchbar} placeholder={serachBarTitle}/>
            <section className="grid">
                {children}
            </section>
        </section>

    );
};
