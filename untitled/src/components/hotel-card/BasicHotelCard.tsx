import {FC, ReactNode, useState} from "react";

interface BasicHotelCardProps {
    name: string,
    description: string,
    location: string,
    rate: number,
    pricePerRoom: number
    favorite?: boolean,
    showFavorite: boolean,
    onFavorite?: () => void,
    children?: ReactNode
}

const BasicHotelCard: FC<BasicHotelCardProps> = (props) => {
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
                         alt='Heart icon' />
                </button>
            )
        }
    };

    return (
        <section className="hotel-card">
            <article className="hotel-card-image">
                <p className="chip">{props.location}</p>
                {renderButton()}
            </article>
            <p className="hotel-card-name">{props.name}</p>
            <p className="text-small">{props.description}</p>
            <article className="hotel-card-stars-and-price">
                <p>★★★★★</p>
                <p>{props.pricePerRoom}€/room</p>
            </article>
            <button className="button primary">
                View offer
                <img src="assets/icons/arrow.svg" alt="Arrow"/>
            </button>
        </section>
    );
}
