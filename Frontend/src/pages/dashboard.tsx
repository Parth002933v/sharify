import React from 'react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { generateRandomHash } from '@/lib/utils'

export default function Dashboard() {
    const navigation = useNavigate()

    const handleGetStarted = () => navigation({ hash: generateRandomHash() })

    return (
        <div className='p-6 place-content-center text-center h-[calc(100vh-8rem)]'>
            <h1 className="text-3xl font-bold mb-4 ">Welcome to Sharify!</h1>
            <p className="text-lg mb-6">
                Share your content, connect with others, and explore a world of ideas.
            </p>
            <Button onClick={() => handleGetStarted()} variant='default' className='text-lg py-6 px-7 '>
                Get Started
            </Button>
        </div>
    )
}
