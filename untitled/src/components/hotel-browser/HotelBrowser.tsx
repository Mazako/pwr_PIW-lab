import {ChangeEvent, FC, ReactNode, useState} from "react";
import styles from './HotelBrowser.module.css';

interface HotelBrowserProps {
    title?: string,
    serachBarTitle: string,
    inputValue: string,
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
    children?: ReactNode

}

export const HotelBrowser: FC<HotelBrowserProps> = ({title,
                                                        serachBarTitle,
                                                        inputValue,
                                                        onInputChange,
                                                        children}) => {
    return (
        <section className={styles.hotelCards}>
            <article className={styles.hotelCardsHeader}>
                {title}
            </article>
            <input className={styles.searchbar} placeholder={serachBarTitle} value={inputValue} onChange={onInputChange}/>
            <section className="grid">
                {children}
            </section>
        </section>

    );
};
