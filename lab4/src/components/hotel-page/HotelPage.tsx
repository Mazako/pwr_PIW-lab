import {FC, useRef} from "react";
import {Header} from "../header/Header";
import styles from './HotelPage.module.css'
import {createRateStr} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/Store";
import {ContactModal} from "../contact-modal/ContactModal";
import {useNavigate} from "react-router";
import {EditModal} from "../edit-modal/EditModal";
import {HotelDTO} from "../../firebase/HotelQuerries";
import {addToFavorites, isFavoriteSelector, removeFromFavorites} from "../../features/HotelsSlice";

interface HotelPageProps {
    hotel: HotelDTO,
    showContact: boolean,
    showEdit: boolean
    showRemove: boolean
    showFavorite: boolean
}

export const HotelPage: FC<HotelPageProps> = ({hotel, showContact, showEdit, showRemove, showFavorite}) => {
    const dispatch: AppDispatch = useDispatch();
    const contactRef = useRef<HTMLDialogElement>(null);
    const editRef = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const isFavorite = useSelector((state: RootState) => isFavoriteSelector(state, hotel.id))


    const renderFavButton = () => {
        const handleFavoriteClick = () => {
            if (isFavorite) {
                dispatch(removeFromFavorites(hotel.id));
            } else {
                dispatch(addToFavorites(hotel.id))
            }
        };

        if (showFavorite) {
            return (
                <button className="button secondary" onClick={handleFavoriteClick}>
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    <img src={isFavorite ? '/assets/icons/filled-heart.svg' : '/assets/icons/empty-heart.svg'}
                         alt="heart"/>
                </button>
            );
        }
    };

    const renderEditContactRemove = () => {
        const arr = [];
        if (showContact) {
            arr.push(
                <button key='btn-remove' className="button primary" onClick={() => contactRef.current && contactRef.current.showModal()}>
                    Contact
                    <img src="/assets/icons/mail.svg" alt="Mail icon"/>
                </button>
            );
        }

        if (showEdit) {
            const handleEdit = () => {
                // if (editRef.current) {
                //     dispatch(initEdit(hotel.id));
                //     editRef.current.showModal();
                // }
            }

            arr.push(
                <button key='btn-edit' className="button primary" onClick={handleEdit}>
                    Edit
                    <img src="/assets/icons/pencil.svg" alt="Pencil icon"/>
                </button>
            );
        }

        if (showRemove) {
            const handleRemove = () => {
                // dispatch(removeHotel(hotel.id));
                // navigate('/browse');
            }

            arr.push(
                <button key='btn-remove' className="button primary" onClick={handleRemove}>
                    Remove
                    <img src="/assets/icons/trash.svg" alt="Trash icon"/>
                </button>
            );
        }

        return arr;
    };

    return (
        <section>
            <ContactModal hotelName={hotel.name} ref={contactRef}/>
            <EditModal ref={editRef} />
            <Header title={hotel.name}/>
            <section className="grid">
                <article className={styles.left} style={{backgroundImage: `url(${hotel.bigImgPath})`}}>
                    {renderFavButton()}
                </article>
                <section className={styles.right}>
                    <article className={`text-small ${styles.rightInfo}`}>
                        <p><span>Location: </span>{hotel.location}</p>
                        <p><span>Local category: </span>{createRateStr(hotel.localCategory)}</p>
                        <p><span>Price: </span>{hotel.price}€/room/night</p>
                        <p><span>Description: </span></p>
                    </article>
                    <p className="text-small">{hotel.longDescription}</p>
                    <article className={styles.buttonContainer}>
                        {renderEditContactRemove()}
                    </article>
                    <article className={styles.imageContainer}>
                        <img src={hotel.galleryImg1Path} alt="Small hotel"/>
                        <img src={hotel.galleryImg2Path} alt="Small hotel"/>
                    </article>
                </section>
            </section>
        </section>
    );
};
