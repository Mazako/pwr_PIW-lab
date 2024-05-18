import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import {getHotelById, searchHotels} from "../firebase/HotelQuerries";
import {HotelDTO, HotelFilterQueryParams} from "../firebase/types";

export const hotelApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getHotelById: builder.query<HotelDTO, { id: string, time: number }>({
            queryFn: async ({id}) => {
                return {data: await getHotelById(id)};
            }
        }),

        getAllHotels: builder.query<HotelDTO[], HotelFilterQueryParams>({
            queryFn: async (params) => {
                return {data: await searchHotels(params)};
            }
        })
    })
});

export const {useGetHotelByIdQuery, useGetAllHotelsQuery} = hotelApi;
