import React from 'react';
import '../dialog-base.css';
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Layout} from "../pages/layout/Layout";
import {RouterProvider} from "react-router";
import {BrowseHotelsPage} from "../pages/browse-hotels/BrowseHotelsPage";
import {FavoriteOffersPage} from "../pages/favorite-offers/FavoriteOffersPage";
import {MyOffersPage} from "../pages/my-offers/MyOffersPage";
import {HotelPage} from "../pages/hotel-page/HotelPage";
import {HeroPage} from "../pages/hero-page/HeroPage";
import {LoginPage} from "../pages/login-page/LoginPage";
import {RegisterPage} from "../pages/register-page/RegisterPage";
import {enableMapSet} from 'immer'
import {ChatPage} from "../pages/chat-page/ChatPage";

const App: React.FC = () => {
    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<Layout/>}>
            <Route index element={<HeroPage/>}/>
            <Route path='/browse' element={<BrowseHotelsPage/>}/>
            <Route path='/favorite' element={<FavoriteOffersPage/>}/>
            <Route path='/my-offers' element={<MyOffersPage/>}/>
            <Route path='/hotel/:hotelId' element={<HotelPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/chat' element={<ChatPage/>}/>
        </Route>
    ]))

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
