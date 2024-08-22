import Dashboard from '@/pages/dashboard'
import SimpleText from '@/pages/simpleText'
import { useLocation } from 'react-router-dom'

export default function Index() {
    const isUrlhasHash = useLocation()




    if (isUrlhasHash.hash) {
        return <SimpleText />
    } else {
        return <Dashboard />

    }
}