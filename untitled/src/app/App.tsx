import React from 'react';

import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Layout} from "../pages/layout/Layout";
import {RouterProvider} from "react-router";
import {BrowseHotelsPage} from "../pages/browse-hotels/BrowseHotelsPage";
import {ReadOnlyHotelPage} from "../pages/read-only-hotel-page/ReadOnlyHotelPage";

const App: React.FC = () => {
    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<Layout/>}>
            <Route path='/browse' element={<BrowseHotelsPage/>}/>
            <Route path='/hotel/:hotelId' element={<ReadOnlyHotelPage/>}/>
        </Route>
    ]))

    return (
        <RouterProvider router={router}/>
    );
}

export default App;