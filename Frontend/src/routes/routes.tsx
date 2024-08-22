import { createBrowserRouter, createRoutesFromElements, Route, RouterProviderProps } from 'react-router-dom'

// pages
import Root from '../pages/root'
import Index from '../pages'
import RichText from '@/pages/richText'
import { HOME_PATH, RICHTEXT_PATH } from '@/common/routeConstant'

export const RoutesTSX: RouterProviderProps = {
    router: createBrowserRouter(createRoutesFromElements(

        <Route path={HOME_PATH} element={<Root />}>
            <Route index  element={<Index />} />
            <Route path={RICHTEXT_PATH} element={<RichText />} />
        </Route >

    ))
}


