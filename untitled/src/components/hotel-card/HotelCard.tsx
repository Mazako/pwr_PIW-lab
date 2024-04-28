import {FC, useState} from "react";
import styles from './HotelCard.module.css';
import {BasicHotelCardProps} from "./props";


const createRateStr = (rate: number): string => {
    let result = '';
    for (let i = 1; i <= 5; i++) {
        result += i <= rate ? '★' : '☆';
    }
    return result;
}

export const HotelCard: FC<BasicHotelCardProps> = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);

    const handleFavoriteClick = () => {
        setFavorite(f => !f);
    };

    const renderButton = () => {
        if (props.showFavorite) {
            return (
                <button>
                    <img src={favorite ? '/assets/icons/filled-heart.svg' : '/assets/icons/empty-heart.svg'}
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
                <button className="button primary" onClick={() => {
                }}>
                    View offer
                    <img src="/assets/icons/arrow.svg" alt="Arrow"/>
                </button>
            )
        }

        if (props.onEdit) {
            buttons.push(
                <button className='button primary' onClick={props.onEdit}>
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
                {renderButton()}
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
