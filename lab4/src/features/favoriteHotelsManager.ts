import {ShortHotelData} from "../firebase/types";
import {SelectType} from "../components/hotel-browser/selectTypes";

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

export const getAllFavorites = (sort: SelectType, text: string) => {
    const favorites = localStorage.getItem(FAV_HOTELS_ENTRY);
    if (!favorites) {
        return [];
    }
    let data = Object.values(JSON.parse(favorites)) as ShortHotelData[];
    if (text.trim() !== '') {
        data = data.filter((item: ShortHotelData) =>
            item.shortDescription.match(new RegExp(`.*${text},*`, 'i'))
        );
    }

    switch (sort) {
        case "default":
            return data;
            break;
        case "description asc":
            return data.sort((a, b) => a.shortDescription.localeCompare(b.shortDescription));
            break;
        case "description desc":
            return data.sort((a, b) => a.shortDescription.localeCompare(b.shortDescription)).reverse();
            break;
        case "name asc":
            return data.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name desc":
            return data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
            break;
        case "location asc":
            return data.sort((a, b) => a.location.localeCompare(b.location));
            break;
        case "location desc":
            return data.sort((a, b) => a.location.localeCompare(b.location)).reverse();
            break;
        case "price asc":
            return data.sort((a, b) => a.price - b.price);
            break;
        case "price desc":
            return data.sort((a, b) => a.price - b.price).reverse();
            break;
        case "local_category asc":
            return data.sort((a, b) => a.localCategory - b.localCategory);
            break;
        case "local_category desc":
            return data.sort((a, b) => a.localCategory - b.localCategory).reverse();
    }
};
