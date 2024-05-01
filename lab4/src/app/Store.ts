import {configureStore} from '@reduxjs/toolkit'
import {hotelsReducer} from "../features/HotelsSlice";
import {hotelApi} from "../features/HotelApi";

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        hotelsApi: hotelApi.reducer
    },

    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hotelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
