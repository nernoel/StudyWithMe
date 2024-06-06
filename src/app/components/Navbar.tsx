'use client'

import { useRouter } from 'next/navigation'

export default function Navbar(){
    const router = useRouter();

    const handleClick = () => {
        router.push('/api/auth/signout')
    }
    return (
        <div className="mt-8 ml-4 mr-4 fixed top-0 left-0 right-0 flex justify-between items-center h-16 bg-gray-200 rounded-full px-4">
          <div className="flex items-center">
          <h1 className="text-4xl font-extrabold"><span className="text-transparent bg-clip-text bg-gray-900">MYSTUDY</span></h1>
          </div>
          
          <div className="flex items-center">
           {/*<a className="text-lg font-normal text-gray-800 lg:text-xl mx-3" href="">My Posts</a> */}
            {/*<a className="text-lg font-normal text-gray-800 lg:text-xl mx-3" href="">All Posts</a>*/}
          </div>
          
          <div className="flex items-center">
            <button type="button" onClick={handleClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign out</button>
          </div>
        </div>
      );
}