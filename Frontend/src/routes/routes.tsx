import { createBrowserRouter, createRoutesFromElements, Route, RouterProviderProps } from 'react-router-dom'

// pages
import Root from '../pages/root'
import Index from '../pages'

export const RoutesTSX: RouterProviderProps = {
    router: createBrowserRouter(createRoutesFromElements(

        <Route path='/' element={<Root />}>
            <Route index element={<Index />} />
            <Route path='/rich/' element={<Index />} />
        </Route >

    ))
}


