'use client'

import { useRouter } from 'next/navigation'

export default function Navbar(){
    const router = useRouter();

    const handleClick = () => {
        router.push('/api/auth/signout')
    }
    return (
        <div className="fixed top-0 left-20 right-20 w-auto flex mt-8 bg-sky-50 pt-2 pb-2 rounded-full">
            <button type="button" onClick={handleClick} className="mt-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign out</button>
        
 
        <div className="flex gap-3">
        <a className="mt-8 text-lg font-normal text-gray-800 lg:text-xl flex justify-center items-center" href="">My Posts</a>
        <a className="mt-8 text-lg font-normal text-gray-800 lg:text-xl flex justify-center items-center" href="">All posts</a>
        
        
        </div>

        </div>
    
    )
}