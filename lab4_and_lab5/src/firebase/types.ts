export interface HotelDTO {
    id: string;
    ownerId: string,
    name: string,
    longDescription: string,
    shortDescription: string,
    location: string,
    localCategory: number,
    price: number,
    bigImgPath: string,
    galleryImg1Path: string,
    galleryImg2Path: string,
}

export interface HotelFilterQueryParams {
    lim: number,
    search?: string,
    order?: OrderEntry,
    ownerId?: string,
    timestamp?: number,
}

export interface AddHotelData {
    name: string,
    description: string,
    location: string,
    localCategory: number,
    pricePerRoom: number,
}

export interface ShortHotelData {
    id: string,
    name: string,
    shortDescription: string,
    location: string,
    localCategory: number,
    price: number,
    imgPath: string,
}

export type OrderDirection = 'asc' | 'desc';

export type OrderCategory = 'price' | 'local_category' | 'description' | 'name' | 'location';

export interface OrderEntry {
    category: OrderCategory,
    direction: OrderDirection,
}
