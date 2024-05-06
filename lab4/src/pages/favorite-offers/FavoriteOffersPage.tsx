import {FC, useState} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {allFavoriteSelector} from "../../features/HotelsSlice";
import {useSelector} from "react-redux";
import {SelectType} from "../../components/hotel-browser/selectTypes";

export const FavoriteOffersPage: FC = () => {
    const [text, setText] = useState('');
    const data = useSelector(allFavoriteSelector);
    const [select, setSelect] = useState<SelectType>('default');

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
