import {FC, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";
import {searchableFirstFourHotelsSelector} from "../../features/HotelsSlice";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";

export const MyOffersPage: FC = () => {
    const [text, setText] = useState('');
    const hotels = useSelector((state: RootState) => searchableFirstFourHotelsSelector(state, text, false));

    return (
        <section>
            <Header title='My offers'/>
            <HotelBrowser serachBarTitle='Search by hotel name, place, description etc '
                          showViewOffer={true}
                          showFavorites={false}
                          favoritesOnly={false}/>
        </section>
    )

}