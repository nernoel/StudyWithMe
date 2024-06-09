import React from 'react';
import Link from 'next/link';

import { auth } from '@/app/api/auth/[...nextauth]/auth'


export default async function NavbarSignIn(){
const session = await auth();
  return (
    <nav className="border-solid sticky top-0 border-neutral-900 w-full border-b py-4 bg-neutral-900 z-50 bg-inherit">
      <div className="container mx-auto">
        <div className="w-full flex flex-col lg:flex-row justify-between">
          <div className="flex lg:flex-row">
            <a
              href=""
              className="rounded-full px-3 py-1 text-4xl font-extrabold flex items-center text-gray-100"
            >
              StudyWithMe
            </a>
          </div>
          <div className="flex items-center">
          <Link href={!session ? "/api/auth/signin" : ""}>
          <button type='button' className='py-2.5 px-6 text-sm rounded-full bg-indigo-500 text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>
            Sign in</button>
          </Link>
          
          </div>
        </div>
      </div>
    </nav>
  );
};


