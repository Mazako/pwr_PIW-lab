import {FC, useState} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {HotelCard} from "../../components/hotel-card/HotelCard";
import {useSelector} from "react-redux";
import {searchableFirstFourHotelsSelector} from "../../features/HotelsSlice";
import {RootState} from "../../app/Store";

export const BrowseHotelsPage: FC = () => {
    const [text, setText] = useState('');
    const hotels = useSelector((state: RootState) => searchableFirstFourHotelsSelector(state, text, false));

    return (
        <section>
            <Header title='Welcome, your tranquility oasis awaits'/>
            <HotelBrowser title='Explore the hotels'
                          serachBarTitle='Search by hotel name, place, description etc '
                          inputValue={text}
                          onInputChange={e => setText(e.target.value)}>
                {
                    hotels.map((hotel) => {
                        return (
                            <HotelCard key={hotel.id}
                                       favorite={hotel.favorite}
                                       id={hotel.id}
                                       showViewOfferButton={true}
                                       showFavorite={true}
                                       name={hotel.name}
                                       description={hotel.shortDescription}
                                       location={hotel.location}
                                       rate={hotel.rate}
                                       pricePerRoom={hotel.pricePerRoom}
                                       imgPath={hotel.imgPath}/>
                        );
                    })
                }
            </HotelBrowser>
        </section>
    )
}
