import {
    addDoc,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    updateDoc,
    where
} from "firebase/firestore";
import {getDownloadURL, ref} from "firebase/storage";
import {db, hotelsRef, storage} from "./firebase";
import {AddHotelData, HotelDTO, HotelFilterQueryParams, ShortHotelData} from "./types";


export const toShortHotelData = (hotel: HotelDTO): ShortHotelData => {
    return {
        id: hotel.id,
        name: hotel.name,
        shortDescription: hotel.shortDescription,
        location: hotel.location,
        localCategory: hotel.localCategory,
        price: hotel.price,
        imgPath: hotel.bigImgPath
    };
};


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
};


export const getHotelById = async (id: string): Promise<HotelDTO> => {
    const response = await getDoc(doc(db, 'hotels', id));
    if (!response.exists()) {
        throw Error('XD');
    }
    return convertToHotelDto(id, response.data());
};

export const searchHotels = async ({search, lim, ownerId, order}: HotelFilterQueryParams): Promise<HotelDTO[]> => {
    const constraints: QueryConstraint[] = [];
    if (search && search !== '') {
        constraints.push(where('description', '>=', search));
        constraints.push(where('description', '<=', `${search}\uf8ff`));
    }

    if (ownerId && ownerId !== '') {
        constraints.push(where('owner_id', '==', ownerId));
    }

    if (order) {
        console.log(order);
        constraints.push(orderBy(order.category, order.direction));
    }

    const qr = query(
        hotelsRef,
        ...constraints,
        limit(lim)
    );

    const result = await getDocs(qr);

    const promises = result.docs
        .map(d => convertToHotelDto(d.id, d.data()));

    return Promise.all(promises);

};

export const addHotel = async (data: AddHotelData, userId: string): Promise<string> => {
    const added = await addDoc(hotelsRef, {
        big_image: '36636f2e-bfdf-429f-bb5a-b7d924b919d4.png',
        description: data.description,
        gallery_image_1: '36636f2e-bfdf-429f-bb5a-b7d924b919d4.png',
        gallery_image_2: '36636f2e-bfdf-429f-bb5a-b7d924b919d4.png',
        local_category: data.localCategory,
        location: data.location,
        name: data.name,
        owner_id: userId,
        price: data.pricePerRoom,
    });
    return added.id;
};

export const removeHotel = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'hotels', id));
};

export const updateHotel = async (hotel: HotelDTO): Promise<void> => {
    const ref = doc(db, 'hotels', hotel.id);

    await updateDoc(ref, {
        description: hotel.longDescription,
        local_category: hotel.localCategory,
        location: hotel.location,
        price: hotel.price,
        name: hotel.name,
    });
};
