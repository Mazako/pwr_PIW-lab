import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/Store";
import {HotelDTO} from "../firebase/HotelQuerries";

interface HotelsSlice {
    favoriteIds: any,
    editingHotel: HotelDTO | null,
}

export type hotelEditField = 'name' | 'longDescription' | 'location' | 'price' | 'localCategory';

const initState: HotelsSlice = {
    favoriteIds: {},
    editingHotel: null,
}

const hotelsSlice = createSlice({
    name: "hotels",
    initialState: initState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<string>) => {
            state.favoriteIds[action.payload] = 1;
        },

        removeFromFavorites: (state, action: PayloadAction<string>) => {
            delete state.favoriteIds[action.payload];
        },

        initEdit: (state, action: PayloadAction<HotelDTO>) => {
            state.editingHotel = action.payload;
        },

        updateEdited: (state, action: PayloadAction<{ type: hotelEditField, value: string }>) => {
            const hotel = state.editingHotel;
            if (!hotel) {
                return;
            }
            if (action.payload.type === 'localCategory' || action.payload.type === 'price') {
                hotel[action.payload.type] = Number(action.payload.value);
            } else {
                hotel[action.payload.type] = action.payload.value;
            }
        },

        clearEdited: (state) => {
            state.editingHotel = null;
        }
    }
})

export const allFavoriteSelector = (state: RootState) => state.hotels.favoriteIds;
export const isFavoriteSelector = (state: RootState, id: string) => state.hotels.favoriteIds[id] !== undefined;
export const editedHotelSelector = (state: RootState) => state.hotels.editingHotel;

export const {addToFavorites, removeFromFavorites, initEdit, clearEdited,updateEdited} = hotelsSlice.actions;
export const hotelsReducer = hotelsSlice.reducer;
