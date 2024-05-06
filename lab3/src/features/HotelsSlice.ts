import {HotelData, hotels} from "./data";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/Store";

interface HotelsSlice {
    data: HotelData[],
    editingHotel: HotelData | null,
    newId: number,
}

interface AddHotelData {
    name: string,
    longDescription: string,
    location: string,
    localCategory: number,
    pricePerRoom: number,
}

export type hotelEditField = 'name' | 'longDescription' | 'location' | 'pricePerRoom' | 'localCategory';

const initState: HotelsSlice = {
    data: hotels,
    editingHotel: null,
    newId: hotels.length + 1,
};

const hotelsSlice = createSlice({
    name: "hotels",
    initialState: initState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const hotel = state.data.find(hotel => hotel.id === action.payload);
            if (hotel) {
                hotel.favorite = !hotel.favorite;
            }
        },

        removeHotel: (state, action: PayloadAction<number>) => {
            const pos = state.data.findIndex(hotel => hotel.id === action.payload);
            if (pos !== -1) {
                state.data.splice(pos, 1);
            }
        },

        addHotel: (state, action: PayloadAction<AddHotelData>) => {
            const id = state.newId;
            state.newId += 1;
            const hotel: HotelData = {
                id: id,
                name: action.payload.name,
                longDescription: action.payload.longDescription,
                shortDescription: action.payload.longDescription.substring(0, 30),
                location: action.payload.location,
                owner: true,
                pricePerRoom: action.payload.pricePerRoom,
                localCategory: action.payload.localCategory,
                favorite: false,
                imgPath: '/assets/explore-page/hotel-card-image-4.png',
                smallImgPath: '/assets/explore-page/hotel-card-image-4.png'
            };

            state.data.push(hotel);
        },

        initEdit: (state, action: PayloadAction<number>) => {
            state.editingHotel = state.data.find(hotel => hotel.id === action.payload) || null;
        },

        updateEdited: (state, action: PayloadAction<{ type: hotelEditField, value: string }>) => {
            const hotel = state.editingHotel;
            if (!hotel) {
                return;
            }
            if (action.payload.type === 'localCategory' || action.payload.type === 'pricePerRoom') {
                hotel[action.payload.type] = Number(action.payload.value);
            } else {
                hotel[action.payload.type] = action.payload.value;
            }
        },

        submitEdited: (state) => {
            const hotel = state.editingHotel;
            if (!hotel) {
                return;
            }

            const id = state.data.findIndex(h => h.id === hotel.id);
            if (id !== -1) {
                state.data[id] = hotel;
                state.editingHotel = null;
            }
        }
    }
});

export const hotelByIdSelector = (state: RootState, id: number) => state.hotels.data.find(hotel => hotel.id === id);

export const searchableFirstFourHotelsSelector = (state: RootState, input: string, onlyFavorite: boolean, onlyOwned: boolean) => {
    let data = onlyOwned ? state.hotels.data.filter(hotel => hotel.owner) : state.hotels.data;
    data = onlyFavorite ? state.hotels.data.filter(hotel => hotel.favorite) : data;
    return data
        .filter(hotel => hotel.shortDescription.match(new RegExp(`.*${input}.*`)))
        .slice(0, 4);
};

export const editedHotelSelector = (state: RootState) => state.hotels.editingHotel;

export const {
    toggleFavorite,
    removeHotel,
    initEdit,
    submitEdited,
    updateEdited,
    addHotel
} = hotelsSlice.actions;
export const hotelsReducer = hotelsSlice.reducer;
