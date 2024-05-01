import {FC, ReactNode, useState} from "react";
import styles from './HotelBrowser.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";
import {searchableFirstFourHotelsSelector} from "../../features/HotelsSlice";
import {HotelCard} from "../hotel-card/HotelCard";
import {useGetAllHotelsQuery} from "../../features/HotelApi";

interface HotelBrowserProps {
    title?: string,
    searchBarTitle: string,
    favoritesOnly: boolean,
    showViewOffer: boolean,
    showFavorites: boolean
    onEdit?: (id: string) => void,
    children?: ReactNode
}

export const HotelBrowser: FC<HotelBrowserProps> = (props) => {
    const [text, setText] = useState('');
    // const hotels = useSelector((state: RootState) => searchableFirstFourHotelsSelector(state, text, props.favoritesOnly, props.onEdit !== undefined));

    const {data,  isLoading, error} = useGetAllHotelsQuery({limit: 4, search: text})

    const editHandler = (id: string) => {
        if (props.onEdit) {
            //@ts-ignore
            return () => props.onEdit(id);
        } else {
            return undefined;
        }
    }

    if (isLoading) {
        return <></>;
    }

    return (
        <section className={styles.hotelCards} style={!props.title ? {paddingTop: 24} : {}}>
            <article className={styles.hotelCardsHeader}>
                {props.title}
            </article>
            <input className={styles.searchbar} placeholder={props.searchBarTitle} value={text}
                   onChange={e => setText(e.target.value)}/>
            <section className="grid">
                {
                    data?.map((hotel) => {
                        return (
                            <HotelCard key={hotel.id}
                                       favorite={false}
                                       id={hotel.id}
                                       showViewOfferButton={props.showViewOffer}
                                       showFavorite={props.showFavorites}
                                       name={hotel.name}
                                       description={hotel.shortDescription}
                                       location={hotel.location}
                                       rate={hotel.localCategory}
                                       pricePerRoom={hotel.price}
                                       imgPath={hotel.bigImgPath}
                                       onEdit={editHandler(hotel.id)}/>
                        );
                    })
                }
            </section>
            {props.children}
        </section>

    );
};
