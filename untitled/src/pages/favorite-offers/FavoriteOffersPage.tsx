import {FC} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";

export const FavoriteOffersPage: FC = () => {

    return (
        <section>
            <Header title='Favorite offers'/>
            <HotelBrowser serachBarTitle='Search by hotel name, place, description etc '
                          showViewOffer={true}
                          showFavorites={true}
                          favoritesOnly={true}/>
        </section>
    )
}