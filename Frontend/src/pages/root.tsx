import { Outlet } from 'react-router-dom'
import Header from '../components/root/header'
import Footer from '../components/root/footer'

export default function Root() {
    return (
        <div className=' h-full  bg-secondary'>

            <Header />

            <div className='flex flex-col justify-between h-full pt-16 '>
                <div className='flex-grow inset-0  w-full h-full'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}
