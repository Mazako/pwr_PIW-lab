import {hotels} from "./data";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/Store";


const hotelsSlice = createSlice({
    name: "hotels",
    initialState: hotels,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const hotel = state.find(hotel => hotel.id === action.payload);
            if (hotel) {
                hotel.favorite = !hotel.favorite;
            }
        }
    }
})

export const firstFourHotelsSelector = (state: RootState) => state.hotels.slice(0, 4);
export const firstFourFavoritesHotelsSelector = (state: RootState) => state.hotels
    .filter(hotel => hotel.favorite)
    .slice(0, 4);
export const hotelByIdSelector = (state: RootState, id: number) => state.hotels.find(hotel => hotel.id === id);

export const searchableFirstFourHotelsSelector = (state: RootState, input: string, onlyFavorite: boolean) => {
    const data = onlyFavorite ? state.hotels.filter(hotel => hotel.favorite) : state.hotels;
    return data
        .filter(hotel => hotel.shortDescription.match(new RegExp(`.*${input}.*`)))
        .slice(0, 4)
}

export const {toggleFavorite} = hotelsSlice.actions;
export const hotelsReducer = hotelsSlice.reducer;
