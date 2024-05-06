import {FC, useEffect, useRef, useState} from "react";
import {Header} from "../../components/header/Header";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import {useGetAllHotelsQuery} from "../../features/HotelApi";
import {toShortHotelData} from "../../firebase/HotelQuerries";
import {useSelector} from "react-redux";
import {userEditionsSelector} from "../../features/HotelsSlice";
import {SelectType, toOrderEntry} from "../../components/hotel-browser/selectTypes";

export const BrowseHotelsPage: FC = () => {
    const timestamp = useRef(Date.now()).current;
    const editions = useSelector(userEditionsSelector);

    const [text, setText] = useState('');
    const [select, setSelect] = useState<SelectType>('default');

    const {data, isLoading, error} = useGetAllHotelsQuery({lim: 4,
        search: text,
        timestamp: timestamp + editions.count,
        order: toOrderEntry(select)
    });


    if (isLoading || !data) {
        return <></>;
    }

    return (
        <section>
            <Header title='Welcome, your tranquility oasis awaits'/>
            <HotelBrowser title='Explore the hotels'
                          searchBarTitle='Search by hotel name, place, description etc '
                          searchText={text}
                          onSearchChange={e => setText(e.target.value)}
                          select={select}
                          onSelectChange={e => setSelect(e.target.value as SelectType)}
                          showViewOffer={true}
                          showFavorites={true}
                          data={data.map(toShortHotelData)}
            />
        </section>
    );
};
