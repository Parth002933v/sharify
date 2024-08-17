import { Outlet } from 'react-router-dom'
import Header from '../components/root/header'
import Footer from '../components/root/footer'

export default function Root() {
    return (
        <div className=' flex flex-col h-screen'>
            <Header />
                <Outlet />
            <Footer />


        </div>
    )
}
