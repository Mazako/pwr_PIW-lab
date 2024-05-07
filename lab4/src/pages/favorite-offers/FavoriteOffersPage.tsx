import {FC, useEffect, useState} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {SelectType} from "../../components/hotel-browser/selectTypes";
import {getAllFavorites} from "../../features/favoriteHotelsManager";
import {ShortHotelData} from "../../firebase/types";

export const FavoriteOffersPage: FC = () => {
    const [text, setText] = useState('');
    const [select, setSelect] = useState<SelectType>('default');
    const [data, setData] = useState<ShortHotelData[]>(getAllFavorites(select, text));

    useEffect(() => {
        setData(getAllFavorites(select, text));
    }, [select, text]);

    return (
        <section>
            <Header title='Favorite offers'/>
            <HotelBrowser searchBarTitle='Search by hotel name, place, description etc '
                          searchText={text}
                          onSearchChange={e => setText(e.target.value)}
                          showViewOffer={true}
                          showFavorites={true}
                          data={data}
                          select={select}
                          onSelectChange={e => setSelect(e.target.value as SelectType)}
            />
        </section>
    );
};
