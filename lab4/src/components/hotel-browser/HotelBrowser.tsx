import {ChangeEvent, FC, ReactNode, useState} from "react";
import styles from './HotelBrowser.module.css';
import {useSelector} from "react-redux";
import {allFavoriteSelector} from "../../features/HotelsSlice";
import {HotelCard} from "../hotel-card/HotelCard";
import {useGetAllHotelsQuery} from "../../features/HotelApi";
import {getHotelById, HotelDTO, ShortHotelData} from "../../firebase/HotelQuerries";

interface HotelBrowserProps {
    title?: string,
    searchBarTitle: string,
    data: ShortHotelData[],
    searchText: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
    showViewOffer: boolean,
    showFavorites: boolean,
    onEdit?: (id: string) => Promise<void>,
    children?: ReactNode
}

export const HotelBrowser: FC<HotelBrowserProps> = (props) => {

    return (
        <section className={styles.hotelCards} style={!props.title ? {paddingTop: 24} : {}}>
            <article className={styles.hotelCardsHeader}>
                {props.title}
            </article>
            <input className={styles.searchbar} placeholder={props.searchBarTitle} value={props.searchText}
                   onChange={props.onSearchChange}/>
            <section className="grid">
                {
                    props.data.map((hotel) => {
                        return (
                            <HotelCard key={hotel.id}
                                       id={hotel.id}
                                       showViewOfferButton={props.showViewOffer}
                                       showFavorite={props.showFavorites}
                                       name={hotel.name}
                                       description={hotel.shortDescription}
                                       location={hotel.location}
                                       rate={hotel.localCategory}
                                       pricePerRoom={hotel.price}
                                       imgPath={hotel.imgPath}
                                       onEdit={props.onEdit}/>
                        );
                    })
                }
            </section>
            {props.children}
        </section>

    );
};
