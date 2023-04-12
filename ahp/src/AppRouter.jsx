import React from "react";
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements,Navigate } from "react-router-dom";
import App from "./App";
import BlanckPage from "./blankpage";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="home" element={
                <App/>
            }/>
            <Route path="alternatives" element={<BlanckPage/>}/>
            <Route path="" element={<Navigate to="/home"/>} />
         </Route>
    )
)

export default function AppRouter(){
    return(
        <RouterProvider router={router}/>
    )
}