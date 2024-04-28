import {FC} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {findHotelById} from "../../data/data";
import {HotelCard} from "../../components/hotel-card/HotelCard";

export const BrowseHotelsPage: FC = () => {
    return (
        <section>
            <Header title='Welcome, your tranquility oasis awaits'/>
            <HotelBrowser title='Explore the hotels' serachBarTitle='Search by hotel name, place, description etc '>
                {
                    [1, 2, 3, 4].map((id) => {
                        const hotel = findHotelById(id);
                        if (hotel) {
                            return (
                                <HotelCard key={id}
                                           showViewOfferButton={true}
                                           showFavorite={true}
                                           name={hotel.name}
                                           description={hotel.shortDescription}
                                           location={hotel.location}
                                           rate={hotel.rate}
                                           pricePerRoom={hotel.pricePerRoom}
                                           imgPath={hotel.imgPath}/>
                            );
                        }
                        return null;
                    })
                }
            </HotelBrowser>
        </section>
    )
}
