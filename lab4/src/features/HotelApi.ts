import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import {db, hotelsRef, storage} from "../firebase/firebase";
import {doc, DocumentData, getDoc, getDocs, query, orderBy, limit, where} from "firebase/firestore";
import {getDownloadURL, ref} from 'firebase/storage';

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

interface HotelFilterQueryParams {
    limit: number,
    search?: string,
}

const convertToHotelDto = async (id: string, result: DocumentData): Promise<HotelDTO> => {
    return {
        id,
        ownerId: result.owner_id,
        name: result.name,
        longDescription: result.description,
        shortDescription: result.description.substring(0, 170) + '...',
        location: result.location,
        localCategory: result.local_category,
        price: result.price,
        bigImgPath: await getDownloadURL(ref(storage, '/' + result.big_image)),
        galleryImg1Path: await getDownloadURL(ref(storage, '/' + result.gallery_image_1)),
        galleryImg2Path: await getDownloadURL(ref(storage, '/' + result.gallery_image_2)),
    };
}

export const hotelApi = createApi({
    reducerPath: 'hotelsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getHotelById: builder.query<HotelDTO, string>({
            queryFn: async (id) => {
                const response = await getDoc( doc(db, 'hotels', id));
                if (!response.exists()) {
                    return {error: ''}
                }
                const data = await convertToHotelDto(id, response.data());
                return {data};
            }
        }),

        getAllHotels: builder.query<HotelDTO[], HotelFilterQueryParams>({
            queryFn: async (params) => {

                let qr;
                if (params.search && params.search != '') {
                    qr = query(
                        hotelsRef,
                        //WILD workaround for LIKE operator :ooo (https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search)
                        where('description', '>=', params.search),
                        where('description', '<=', `${params.search}\uf8ff`),
                        limit(params.limit)
                    );
                } else {
                    qr = query(
                        hotelsRef,
                        limit(params.limit)
                    );

                }
                const result = await getDocs(qr);
                const promises = result.docs
                    .map(d => convertToHotelDto(d.id, d.data()));
                const data = await Promise.all(promises)
                return {data};
            }
        })
    })
})

export const {useGetHotelByIdQuery, useGetAllHotelsQuery} = hotelApi;
