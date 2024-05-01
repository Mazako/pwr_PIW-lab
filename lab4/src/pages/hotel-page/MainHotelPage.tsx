import {FC} from "react";
import {Navigate, useNavigate, useParams} from "react-router";
import {HotelPage} from "../../components/hotel-page/HotelPage";
import {useGetHotelByIdQuery} from "../../features/HotelApi";
import {getAuth} from "firebase/auth";

export const MainHotelPage: FC = () => {
    const {hotelId} = useParams();
    const {data, isLoading, isError} = useGetHotelByIdQuery(hotelId || '');
    const auth = getAuth();
    const navigate = useNavigate()

    if (isError) {
        return <Navigate to='/browse' />;
    }

    if (isLoading || data === undefined) {
        return <></>;
    }

    if (data.ownerId === auth.currentUser?.uid) {
        return (
            <HotelPage hotel={data}
                       showFavorite={false}
                       showContact={false}
                       showEdit={true}
                       showRemove={true}/>
        )
    } else {
        return (
            <HotelPage hotel={data}
                       showFavorite={true}
                       showContact={true}
                       showEdit={false}
                       showRemove={false}/>
        )
    }

}
