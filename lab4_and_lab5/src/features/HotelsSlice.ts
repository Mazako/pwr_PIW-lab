import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/Store";
import {HotelDTO} from "../firebase/types";

interface HotelsSlice {
    editingHotel: HotelDTO | null,
    userEditions: {
        count: number
    }
}

export type hotelEditField = 'name' | 'longDescription' | 'location' | 'price' | 'localCategory';

const initState: HotelsSlice = {
    editingHotel: null,
    userEditions: {
        count: 0
    }
};

const hotelsSlice = createSlice({
    name: "hotels",
    initialState: initState,
    reducers: {

        initEdit: (state, action: PayloadAction<HotelDTO>) => {
            state.editingHotel = action.payload;
        },

        incrementUserEditions: (state) => {
            state.userEditions.count += 1;
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
});

export const editedHotelSelector = (state: RootState) => state.hotels.editingHotel;
export const userEditionsSelector = (state: RootState) => state.hotels.userEditions;

export const {
    initEdit,
    clearEdited,
    updateEdited,
    incrementUserEditions
} = hotelsSlice.actions;
export const hotelsReducer = hotelsSlice.reducer;
