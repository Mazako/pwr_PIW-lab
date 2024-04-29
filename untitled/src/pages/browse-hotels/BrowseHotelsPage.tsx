import {FC} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";

export const BrowseHotelsPage: FC = () => {
    return (
        <section>
            <Header title='Welcome, your tranquility oasis awaits'/>
            <HotelBrowser title='Explore the hotels'
                          serachBarTitle='Search by hotel name, place, description etc '
                          showViewOffer={true}
                          showFavorites={true}
                          favoritesOnly={false}/>
        </section>
    )
}
