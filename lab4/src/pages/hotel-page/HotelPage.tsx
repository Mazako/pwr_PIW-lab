import {FC, useRef} from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import {useGetHotelByIdQuery} from "../../features/HotelApi";
import {getAuth} from "firebase/auth";
import {AppDispatch, RootState} from "../../app/Store";
import {useDispatch, useSelector} from "react-redux";
import {
    addToFavorites,
    initEdit,
    isFavoriteSelector,
    removeFromFavorites,
    userEditionsSelector
} from "../../features/HotelsSlice";
import {removeHotel, toShortHotelData} from "../../firebase/HotelQuerries";
import {ContactModal} from "../../components/contact-modal/ContactModal";
import {EditModal} from "../../components/edit-modal/EditModal";
import {Header} from "../../components/header/Header";
import styles from "./HotelPage.module.css";
import {createRateStr} from "../../utils/utils";

export const HotelPage: FC = () => {
    const timestamp = useRef(Date.now()).current;
    const {hotelId} = useParams();
    const editions = useSelector(userEditionsSelector);

    const {data, isLoading, isError} = useGetHotelByIdQuery({
        id: hotelId || '',
        time: timestamp + editions.count
    });

    const auth = getAuth();
    const dispatch: AppDispatch = useDispatch();
    const contactRef = useRef<HTMLDialogElement>(null);
    const editRef = useRef<HTMLDialogElement>(null);
    const isFavorite = useSelector((state: RootState) => isFavoriteSelector(state, data?.id || ''));
    const navigate = useNavigate();

    if (isError) {
        return <Navigate to='/browse'/>;
    }

    if (isLoading || data === undefined) {

        return <></>;
    }
    const isOwner = data?.ownerId === auth.currentUser?.uid

    const renderFavButton = () => {
        if (isOwner) {
            const handleFavoriteClick = () => {
                if (isFavorite) {
                    dispatch(removeFromFavorites(data.id));
                } else {
                    dispatch(addToFavorites(toShortHotelData(data)));
                }
            };

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
        if (!isOwner) {
            arr.push(
                <button key='btn-remove' className="button primary"
                        onClick={() => contactRef.current && contactRef.current.showModal()}>
                    Contact
                    <img src="/assets/icons/mail.svg" alt="Mail icon"/>
                </button>
            );
        }

        if (isOwner) {
            const handleEdit = () => {
                if (editRef.current) {
                    dispatch(initEdit(data));
                    editRef.current.showModal();
                }
            }

            arr.push(
                <button key='btn-edit' className="button primary" onClick={handleEdit}>
                    Edit
                    <img src="/assets/icons/pencil.svg" alt="Pencil icon"/>
                </button>
            );

            const handleRemove = async () => {
                await removeHotel(data.id);
                if (isFavorite) {
                    dispatch(removeFromFavorites(data.id));
                }
                navigate('/my-offers');
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
            <ContactModal hotelName={data.name} ref={contactRef}/>
            <EditModal ref={editRef}/>
            <Header title={data.name}/>
            <section className="grid">
                <article className={styles.left} style={{backgroundImage: `url(${data.bigImgPath})`}}>
                    {renderFavButton()}
                </article>
                <section className={styles.right}>
                    <article className={`text-small ${styles.rightInfo}`}>
                        <p><span>Location: </span>{data.location}</p>
                        <p><span>Local category: </span>{createRateStr(data.localCategory)}</p>
                        <p><span>Price: </span>{data.price}€/room/night</p>
                        <p><span>Description: </span></p>
                    </article>
                    <p className="text-small">{data.longDescription}</p>
                    <article className={styles.buttonContainer}>
                        {renderEditContactRemove()}
                    </article>
                    <article className={styles.imageContainer}>
                        <img src={data.galleryImg1Path} alt="Small hotel"/>
                        <img src={data.galleryImg2Path} alt="Small hotel"/>
                    </article>
                </section>
            </section>
        </section>
    );

}
