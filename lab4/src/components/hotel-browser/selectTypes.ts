import {OrderCategory, OrderDirection, OrderEntry} from "../../firebase/types";

export type SelectType = 'price asc'
    | 'price desc'
    | 'local_category asc'
    | 'local_category desc'
    | 'location asc'
    | 'location desc'
    | 'description asc'
    | 'description desc'
    | 'name desc'
    | 'name asc'
    | 'default'

export const toOrderEntry = (select: SelectType): OrderEntry | undefined => {
    if (select === 'default') {
        return undefined;
    }
    const data = select.split(' ');
    return {
        category: data[0] as OrderCategory,
        direction: data[1] as OrderDirection,
    }
}
