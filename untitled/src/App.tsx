import React from 'react';
import './App.css';

import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import {Layout} from "./pages/layout/Layout";
import {Outlet, RouterProvider} from "react-router";
import {BrowseHotelsPage} from "./pages/browse-hotels/BrowseHotelsPage";

const App: React.FC = () => {
    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<Layout />}>
            <Route path='/browse' element={<BrowseHotelsPage />} />
        </Route>
    ]))

    return (
        <RouterProvider router={router} />
    );
}

export default App;
