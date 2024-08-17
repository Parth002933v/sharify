import { Button } from '@/components/ui/button'
import { useLocation } from 'react-router-dom'

export default function Index() {

    return (
        <div className='flex flex-grow flex-col inset-0 p-6  text-center  justify-center items-center'>
            <h1 className="text-3xl font-bold mb-4 ">Welcome to Sharify!</h1>

            <p className="text-lg mb-6">
                Share your content, connect with others, and explore a world of ideas.
            </p>
            <Button variant='outline' className='text-lg py-6 px-7'>
                Get Started
            </Button>
        </div>
    )
}
