import React from 'react';
import Link from 'next/link';
import { auth } from '@/app/api/auth/[...nextauth]/auth'

export default async function NavbarSignIn(){
const session = await auth();
  return (
    <nav className="sticky top-0 bg-sky-50 w-full py-4 bg-gray-100 z-50 bg-inherit shadow-md shadow-sky-50">
      <div className="container mx-auto">
        <div className="w-full flex flex-col lg:flex-row justify-between">
          <div className="flex lg:flex-row">
            <img
              src="/StudyWithMeLogo.png"
              className="h-14 rounded-full px-3 py-1 text-4xl font-extrabold flex items-center text-gray-100"
            >
            </img>
          </div>
          <div className="flex items-center">
          <Link href={!session ? "/auth/login" : "/pages/dashboard"}>
          <button type='button' className='py-2.5 px-6 text-sm rounded-full bg-sky-300 text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-sky-500'>
            Sign in</button>
          </Link>
          
          </div>
        </div>
      </div>
    </nav>
  );
};

