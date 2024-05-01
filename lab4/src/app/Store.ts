import {configureStore} from '@reduxjs/toolkit'
import {hotelsReducer} from "../features/HotelsSlice";
import {hotelApi} from "../features/HotelApi";
import {loggedInReducer} from "../features/LoggedInSlice";

export const store = configureStore({
    reducer: {
        hotels: hotelsReducer,
        hotelsApi: hotelApi.reducer,
        loggedIn: loggedInReducer
    },

    // @ts-ignore
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hotelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
