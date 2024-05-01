import {FC, useState} from "react";
import styles from './HotelCard.module.css';
import {BasicHotelCardProps} from "./props";
import {createRateStr} from "../../utils/utils";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/Store";
import {toggleFavorite} from "../../features/HotelsSlice";
import {useNavigate} from "react-router";


export const HotelCard: FC<BasicHotelCardProps> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const handleFavoriteClick = () => {
        // dispatch(toggleFavorite(props.id));
    };
    const navigate = useNavigate()

    const renderFav = () => {
        if (props.showFavorite) {
            return (
                <button>
                    <img src={props.favorite ? '/assets/icons/filled-heart.svg' : '/assets/icons/empty-heart.svg'}
                         onClick={handleFavoriteClick}
                         alt='Heart icon'/>
                </button>
            )
        }
    };

    const renderButtons = () => {
        const buttons = []
        if (props.showViewOfferButton) {
            buttons.push(
                <button key='btn-view' className="button primary" onClick={() => navigate(`/hotel/${props.id}`)}>
                    View offer
                    <img src="/assets/icons/arrow.svg" alt="Arrow"/>
                </button>
            )
        }

        if (props.onEdit) {
            buttons.push(
                <button key='btn-edit' className='button primary' onClick={props.onEdit}>
                    Edit offer
                    <img src='/assets/icons/pencil.svg' alt='Edit icon'/>
                </button>
            )
        }
        return buttons;
    }

    return (
        <section className={styles.hotelCard}>
            <article className={styles.hotelCardImage} style={{
                backgroundImage: `url(${props.imgPath})`
            }}>
            <p className="chip">{props.location}</p>
                {renderFav()}
            </article>
            <p className={styles.hotelCardName}>{props.name}</p>
            <p className="text-small">{props.description}</p>
            <article className={styles.hotelCardStartAndPrice}>
                <p>{createRateStr(props.rate)}</p>
                <p>{props.pricePerRoom}€/room</p>
            </article>
            <article className={styles.hotelCardButtonContainer}>
                {renderButtons()}
            </article>
        </section>
    );
};
