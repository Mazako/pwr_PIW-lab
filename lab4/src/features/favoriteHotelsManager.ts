import {ShortHotelData} from "../firebase/types";

export const FAV_HOTELS_ENTRY = 'favoriteHotels';

export const addToFavorites = (hotel: ShortHotelData) => {
    const favorites = localStorage.getItem(FAV_HOTELS_ENTRY);
    if (!favorites) {
        const json = {
            [hotel.id]: hotel
        };
        localStorage.setItem(FAV_HOTELS_ENTRY, JSON.stringify(json));
    } else {
        const json = JSON.parse(favorites);
        json[hotel.id] = hotel;
        localStorage.setItem(FAV_HOTELS_ENTRY, JSON.stringify(json));
    }
};


export const isFavorite = (id: string) => {
    const favorites = localStorage.getItem(FAV_HOTELS_ENTRY);
    if (!favorites) {
        return false;
    } else {
        const json = JSON.parse(favorites);
        return json[id] !== undefined;
    }
};

export const removeFromFavorite = (id: string) => {
    const favorites = localStorage.getItem(FAV_HOTELS_ENTRY);
    if (favorites) {
        const json = JSON.parse(favorites);
        delete json[id];
        localStorage.setItem(FAV_HOTELS_ENTRY, JSON.stringify(json));
    }
};

export const getAllFavorites = () => {
    const favorites = localStorage.getItem(FAV_HOTELS_ENTRY);
    if (!favorites) {
        return [];
    }
    return Object.values(JSON.parse(favorites)) as ShortHotelData[];
};
