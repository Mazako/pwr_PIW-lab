import {FC} from "react";
import {HotelData} from "../../features/data";
import {Header} from "../header/Header";
import styles from './HotelPage.module.css'
import {createRateStr} from "../../utils/utils";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/Store";
import {toggleFavorite} from "../../features/HotelsSlice";

export interface HotelPageProps {
    hotel: HotelData,

}

export const HotelPage: FC<{ hotel: HotelData }> = ({hotel}) => {
    const dispatch: AppDispatch = useDispatch()

    const renderFavButton = () => {
        return (
            <button className="button secondary" onClick={() => dispatch(toggleFavorite(hotel.id))}>
                {hotel.favorite ? 'Remove from favorites' : 'Add to favorites'}
                <img src={hotel.favorite ? '/assets/icons/filled-heart.svg' : '/assets/icons/empty-heart.svg'}
                     alt="heart"/>
            </button>
        )
    }

    return (
        <section>
            <Header title={hotel.name}/>
            <section className="grid">
                <article className={styles.left} style={{backgroundImage: `url(${hotel.imgPath})`}}>
                    {renderFavButton()}
                </article>
                <section className={styles.right}>
                    <article className={`text-small ${styles.rightInfo}`}>
                        <p><span>Location: </span>{hotel.location}</p>
                        <p><span>Local category: </span>{createRateStr(hotel.rate)}</p>
                        <p><span>Price: </span>{hotel.pricePerRoom}€/room/night</p>
                        <p><span>Description: </span></p>
                    </article>
                    <p className="text-small">{hotel.longDescription}</p>
                    <button className="button primary">
                        Contact
                        <img src="/assets/icons/mail.svg" alt="Mail icon"/>
                    </button>
                    <article className={styles.imageContainer}>
                        <img src={hotel.imgPath} alt="Small hotel"/>
                        <img src={hotel.imgPath} alt="Small hotel"/>
                    </article>
                </section>
            </section>
        </section>
    );
};
