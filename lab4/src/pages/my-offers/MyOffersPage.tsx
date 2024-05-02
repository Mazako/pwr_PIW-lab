import {FC, useRef, useState} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {EditModal} from "../../components/edit-modal/EditModal";
import {useGetAllHotelsQuery} from "../../features/HotelApi";
import {getAuth} from "firebase/auth";
import {getHotelById, toShortHotelData} from "../../firebase/HotelQuerries";
import {useDispatch, useSelector} from "react-redux";
import {initEdit, userEditionsSelector} from "../../features/HotelsSlice";

export const MyOffersPage: FC = () => {
    const timestamp = useRef(Date.now()).current;
    const editions = useSelector(userEditionsSelector);

    const ref = useRef<HTMLDialogElement>(null);
    const [text, setText] = useState('');
    const auth = getAuth();
    const dispatch = useDispatch();

    const {data, isLoading} = useGetAllHotelsQuery({
        lim: 4,
        search: text,
        ownerId: auth.currentUser?.uid,
        timestamp: timestamp + editions.count
    })
    console.log('xD');
    if (isLoading || !data) {
        return <></>;
    }

    const handleEditClick = async (id: string) => {
        const hotel = await getHotelById(id);
        console.log('xD')
        dispatch(initEdit(hotel));
        ref.current?.showModal()
    }

    return (
        <section>
            <EditModal ref={ref}/>
            <Header title='My offers'/>
            <HotelBrowser searchBarTitle='Search by hotel name, place, description etc '
                          showViewOffer={true}
                          showFavorites={false}
                          searchText={text}
                          onSearchChange={e => setText(e.target.value)}
                          data={data.map(toShortHotelData)}
                          onEdit={handleEditClick}/>
        </section>
    )

}
