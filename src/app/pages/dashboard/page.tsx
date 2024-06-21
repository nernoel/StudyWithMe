import NavbarSignOut from "@/app/components/Navbar/NavbarSign-out";
import MyPosts from "@/app/components/MyPosts/MyPosts";
import AllStudentPosts from "@/app/components/AllStudentPosts/AllStudentPosts";
import Inbox from '@/app/components/Inbox'
import {auth} from '@/app/api/auth/[...nextauth]/auth'


export default async function Dashboard() {
  const session = await auth();
  return (
    <>
    {/* top right gradient */}
    <div
          className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7dd3fc] to-[#c4b5fd] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
          </div>

      <NavbarSignOut />
      <div className="">

      <h1 className="ml-8 mb-4 text-3xl font-extrabold text-gray-200 md:text-5xl lg:text-3xl mt-9 ml-3"><span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-900 from-gray-900">Welcome {session?.user?.name}!</span> </h1>
      
      <button type="button" className="ml-8 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-gray-900 bg-sky-300 rounded-lg hover:bg-sky-500">
      View Messages
      <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-red-50 bg-red-500 rounded-full">
      2
      </span>
      </button>
            
      </div>
      <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
            {/* Bottom right gradient */}
          <div
            className="relative left-[calc(20%+3rem)] aspect-[1155/678] h-[36.125rem] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f0f9ff] to-[#f0f9ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
          
        
          <MyPosts />
          <AllStudentPosts />
    
      
    </>
  );
}