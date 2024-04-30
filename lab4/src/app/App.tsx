import React, {useEffect} from 'react';
import '../dialog-base.css';
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Layout} from "../pages/layout/Layout";
import {RouterProvider} from "react-router";
import {BrowseHotelsPage} from "../pages/browse-hotels/BrowseHotelsPage";
import {FavoriteOffersPage} from "../pages/favorite-offers/FavoriteOffersPage";
import {MyOffersPage} from "../pages/my-offers/MyOffersPage";
import {MainHotelPage} from "../pages/hotel-page/MainHotelPage";
import {HeroPage} from "../pages/hero-page/HeroPage";
import {getRedirectResult} from 'firebase/auth'
import {auth} from "../firebase/firebase";
const App: React.FC = () => {

    useEffect(() => {
        getRedirectResult(auth)
            .then(r => console.log(r))
    }, [])

    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<Layout/>}>
            <Route index element={<HeroPage />} />
            <Route path='/browse' element={<BrowseHotelsPage/>}/>
            <Route path='/favorite' element={<FavoriteOffersPage/>}/>
            <Route path='/my-offers' element={<MyOffersPage/>}/>
            <Route path='/hotel/:hotelId' element={<MainHotelPage/>}/>
        </Route>
    ]))

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
