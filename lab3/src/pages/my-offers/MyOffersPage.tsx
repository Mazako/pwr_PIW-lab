import {FC, useRef} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {EditModal} from "../../components/edit-modal/EditModal";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/Store";
import {initEdit} from "../../features/HotelsSlice";

export const MyOffersPage: FC = () => {
    const ref = useRef<HTMLDialogElement>(null);
    const dispatch: AppDispatch = useDispatch();

    const handleEditClick = (id: number) => {
        dispatch(initEdit(id));
        ref.current?.showModal();
    };

    return (
        <section>
            <EditModal ref={ref}/>
            <Header title='My offers'/>
            <HotelBrowser searchBarTitle='Search by hotel name, place, description etc '
                          showViewOffer={true}
                          showFavorites={false}
                          favoritesOnly={false}
                        onEdit={handleEditClick}/>
        </section>
    );

};
