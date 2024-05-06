import {FC, ReactNode, useState} from "react";
import styles from './HotelBrowser.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";
import {searchableFirstFourHotelsSelector} from "../../features/HotelsSlice";
import {HotelCard} from "../hotel-card/HotelCard";

interface HotelBrowserProps {
    title?: string,
    searchBarTitle: string,
    favoritesOnly: boolean,
    showViewOffer: boolean,
    showFavorites: boolean
    onEdit?: (id: number) => void,
    children?: ReactNode
}

export const HotelBrowser: FC<HotelBrowserProps> = (props) => {
    const [text, setText] = useState('');
    const hotels = useSelector((state: RootState) => searchableFirstFourHotelsSelector(state, text, props.favoritesOnly, props.onEdit !== undefined));

    const editHandler = (id: number) => {
        if (props.onEdit) {
            // @ts-ignore
            return () => props.onEdit(id);
        } else {
            return undefined;
        }
    };

    return (
        <section className={styles.hotelCards} style={!props.title ? {paddingTop: 24} : {}}>
            <article className={styles.hotelCardsHeader}>
                {props.title}
            </article>
            <input className={styles.searchbar} placeholder={props.searchBarTitle} value={text}
                   onChange={e => setText(e.target.value)}/>
            <section className="grid">
                {
                    hotels.map((hotel) => {
                        return (
                            <HotelCard key={hotel.id}
                                       favorite={hotel.favorite}
                                       id={hotel.id}
                                       showViewOfferButton={props.showViewOffer}
                                       showFavorite={props.showFavorites}
                                       name={hotel.name}
                                       description={hotel.shortDescription}
                                       location={hotel.location}
                                       rate={hotel.localCategory}
                                       pricePerRoom={hotel.pricePerRoom}
                                       imgPath={hotel.imgPath}
                                       onEdit={editHandler(hotel.id)}/>
                        );
                    })
                }
            </section>
            {props.children}
        </section>

    );
};
