import {FC, useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../app/Store";
import {hotelByIdSelector} from "../../features/HotelsSlice";
import {HotelPage} from "../../components/hotel-page/HotelPage";

export const MainHotelPage: FC = () => {
    const {hotelId} = useParams();
    const hotel = useSelector((state: RootState) => hotelByIdSelector(state, Number(hotelId)));

    const navigate = useNavigate()

    useEffect(() => {
        if (!hotel) {
            navigate('/browse')
        }
    }, [hotel, navigate])

    if (!hotel) {
        return <p>Loading...</p>
    }

    if (hotel.owner) {
        return (
            <HotelPage hotel={hotel}
                       showFavorite={false}
                       showContact={false}
                       showEdit={true}
                       showRemove={true}/>
        )
    } else {
        return (
            <HotelPage hotel={hotel}
                       showFavorite={true}
                       showContact={true}
                       showEdit={false}
                       showRemove={false}/>
        )
    }

}
