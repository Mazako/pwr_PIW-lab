import {doc, DocumentData, getDoc, getDocs, limit, query, where} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import {db, hotelsRef, storage} from "./firebase";

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

export interface HotelFilterQueryParams {
    lim: number,
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


export const getHotelById = async (id: string): Promise<HotelDTO> => {
    const response = await getDoc( doc(db, 'hotels', id));
    if (!response.exists()) {
        throw Error('XD')
    }
    return convertToHotelDto(id, response.data());
}

export const searchHotels = async ({search, lim}: HotelFilterQueryParams): Promise<HotelDTO[]> => {
    let qr;
    if (search && search !== '') {
        qr = query(
            hotelsRef,
            //WILD workaround for LIKE operator :ooo (https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search)
            where('description', '>=', search),
            where('description', '<=', `${search}\uf8ff`),
            limit(lim)
        );
    } else {
        qr = query(
            hotelsRef,
            limit(lim)
        );

    }
    const result = await getDocs(qr);

    const promises = result.docs
        .map(d => convertToHotelDto(d.id, d.data()));

    return Promise.all(promises)

}
