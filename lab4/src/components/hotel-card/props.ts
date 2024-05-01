export interface BasicHotelCardProps {
    id: string
    name: string,
    description: string,
    location: string,
    rate: number,
    pricePerRoom: number
    favorite: boolean,
    showFavorite: boolean,
    showViewOfferButton: boolean,
    imgPath: string
    onEdit?: () => void
}
