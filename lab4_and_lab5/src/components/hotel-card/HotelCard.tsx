import {FC, useState} from "react";
import styles from './HotelCard.module.css';
import {createRateStr} from "../../utils/utils";
import {useNavigate} from "react-router";
import {addToFavorites, isFavorite, removeFromFavorite} from "../../features/favoriteHotelsManager";

export interface BasicHotelCardProps {
    id: string
    name: string,
    description: string,
    location: string,
    rate: number,
    pricePerRoom: number
    showFavorite: boolean,
    showViewOfferButton: boolean,
    imgPath: string
    onEdit?: (id: string) => Promise<void>
}


export const HotelCard: FC<BasicHotelCardProps> = (props) => {
    const [isFav, setIsFav] = useState<boolean>(isFavorite(props.id));

    const navigate = useNavigate();

    const renderFav = () => {
        if (props.showFavorite) {
            const handleFavoriteClick = () => {
                if (isFav) {
                    removeFromFavorite(props.id);
                } else {
                    addToFavorites({
                        id: props.id,
                        imgPath: props.imgPath,
                        price: props.pricePerRoom,
                        location: props.location,
                        name: props.name,
                        localCategory: props.rate,
                        shortDescription: props.description
                    });
                }
                setIsFav(isFavorite(props.id));
            };

            return (
                <button>
                    <img src={isFav ? '/assets/icons/filled-heart.svg' : '/assets/icons/empty-heart.svg'}
                         onClick={handleFavoriteClick}
                         alt='Heart icon'/>
                </button>
            );
        }
    };

    const renderButtons = () => {
        const buttons = [];
        if (props.showViewOfferButton) {
            buttons.push(
                <button key='btn-view' className="button primary" onClick={() => navigate(`/hotel/${props.id}`)}>
                    View offer
                    <img src="/assets/icons/arrow.svg" alt="Arrow"/>
                </button>
            );
        }

        if (props.onEdit) {
            const handleEditClick = async () => {
                // @ts-ignore
                await props.onEdit(props.id);
            };
            buttons.push(
                <button key='btn-edit' className='button primary' onClick={handleEditClick}>
                    Edit offer
                    <img src='/assets/icons/pencil.svg' alt='Edit icon'/>
                </button>
            );
        }
        return buttons;
    };

    return (
        <section className={styles.hotelCard}>
            <article className={styles.hotelCardImage} style={{
                backgroundImage: `url(${props.imgPath})`
            }}>
                <p className="chip">{props.location}</p>
                {renderFav()}
            </article>
            <article className={styles.hotelCardInfo}>
                <p className={styles.hotelCardName}>{props.name}</p>
                <p className="text-small">{props.description}</p>
                <article className={styles.hotelCardStartAndPrice}>
                    <p>{createRateStr(props.rate)}</p>
                    <p>{props.pricePerRoom}€/room</p>
                </article>
            </article>
            <article className={styles.hotelCardButtonContainer}>
                {renderButtons()}
            </article>
        </section>
    );
};
