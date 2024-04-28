import {ReactNode} from "react";

export interface BasicHotelCardProps {
    name: string,
    description: string,
    location: string,
    rate: number,
    pricePerRoom: number
    favorite?: boolean,
    showFavorite: boolean,
    imgPath: string
    onFavorite?: () => void,
    showViewOfferButton: boolean,
    onEdit?: () => void
}
