import {FC, useRef, useState} from "react";
import {HotelBrowser} from "../../components/hotel-browser/HotelBrowser";
import styles from './HeroPage.module.css';
import {useNavigate} from "react-router";
import {useGetAllHotelsQuery} from "../../features/HotelApi";
import {toShortHotelData} from "../../firebase/HotelQuerries";
import {SelectType, toOrderEntry} from "../../components/hotel-browser/selectTypes";
import {useSelector} from "react-redux";
import {userEditionsSelector} from "../../features/HotelsSlice";

export const HeroPage: FC = () => {
    const timestamp = useRef(Date.now()).current;
    const editions = useSelector(userEditionsSelector);

    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [select, setSelect] = useState<SelectType>('default');
    const {data, isLoading, error} = useGetAllHotelsQuery({
        lim: 4,
        search: text,
        timestamp: timestamp + editions.count,
        order: toOrderEntry(select),
    })

    if (isLoading || !data) {
        return <></>;
    }

    return (
        <section>
            <section className={`grid ${styles['hero-section']}`}>
                <article className={styles['hero-details']}>
                    <p className={styles['title-large']}>Your tranquillity oasis awaits</p>
                    <p className={styles['text-middle']}>TranquilTravels is designed to help you find a serene retreat
                        for your
                        next holidays. With us searching for the hotels nestled amidst picturesque landscapes is easier
                        than ever. </p>
                    <div className={styles['hero-cards']}>
                        <div className={styles['card-image']}>
                            <p className="chip">New hotels <img src="/assets/icons/arrow.svg"/></p>
                        </div>
                        <div className={styles['card-image']}>
                            <p className="chip">Best reviews <img src="/assets/icons/arrow.svg"/></p>
                        </div>
                    </div>
                </article>
                <div className={styles['hero-image-container']}></div>
            </section>
            <HotelBrowser searchBarTitle='Explore the hotels'
                          searchText={text} onSearchChange={e => setText(e.target.value)}
                          showViewOffer={false}
                          showFavorites={false}
                          data={data.map(toShortHotelData)}
                          select={select}
                          onSelectChange={e => setSelect(e.target.value as SelectType)}>
                <button className="button secondary" style={{width: '15%'}} onClick={() => navigate('/browse')}>
                    Find more
                    <img src="/assets/icons/arrow.svg"/>
                </button>
            </HotelBrowser>
            <section className={`${styles['footer']} grid`}>
                <div className={styles['card-image']}></div>
                <article className={styles['footer-details']}>
                    <p className={styles['title-large']}>Rent with us!</p>
                    <p className={styles['text-middle']}>If you’re a hotel or an apartament owner who’s looking to reach
                        more
                        customers you can now rent your property with TranquilTravels. </p>
                    <button className="button secondary" onClick={() => navigate('/')}>
                        Log in
                        <img src="/assets/icons/arrow.svg"/>
                    </button>
                </article>
            </section>
        </section>
    )
}
