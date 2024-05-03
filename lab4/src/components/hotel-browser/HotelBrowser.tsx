import {ChangeEvent, FC, ReactNode} from "react";
import styles from './HotelBrowser.module.css';
import {HotelCard} from "../hotel-card/HotelCard";
import {ShortHotelData} from "../../firebase/types";
import {SelectType} from "./selectTypes";

interface HotelBrowserProps {
    title?: string,
    searchBarTitle: string,
    data: ShortHotelData[],
    searchText: string,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
    select: SelectType,
    onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void,
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
            <article className={styles.searchAndFilter}>
                <input className={styles.searchbar} placeholder={props.searchBarTitle} value={props.searchText}
                       onChange={props.onSearchChange}/>
                <article className={styles.selectContainer}>
                    <p>Filter options: </p>
                    <select value={props.select} onChange={props.onSelectChange}>
                        <option value='default'>Default</option>
                        <option value='price asc'>Price, ascending</option>
                        <option value='price desc'>Price, descending</option>
                        <option value='local_category asc'>Local category, ascending</option>
                        <option value='local_category desc'>Local category, descending</option>
                        <option value='location asc'>Location, A-Z</option>
                        <option value='location desc'>Location, Z-A</option>
                        <option value='description asc'>Description, A-Z</option>
                        <option value='description desc'>Description, Z-A</option>
                        <option value='name asc'>Name, A-Z</option>
                        <option value='name desc'>Name, Z-A</option>
                    </select>
                </article>
            </article>
            <section className="grid" style={{paddingTop: 12}}>
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
