import {FC, useEffect, useState} from "react";
import {useParams} from "react-router";
import {HotelPage} from "../../components/hotel-page/HotelPage";
import {useSelector} from "react-redux";
import {hotelByIdSelector} from "../../features/HotelsSlice";
import {RootState} from "../../app/Store";

export const ReadOnlyHotelPage: FC = () => {
    const {hotelId} = useParams();
    const hotel = useSelector((state: RootState) => hotelByIdSelector(state, Number(hotelId)));

    if (hotel) {
        return  (
            <HotelPage hotel={hotel}/>
        )
    } else {
        return (<p>Loading...</p>)
    }
};
