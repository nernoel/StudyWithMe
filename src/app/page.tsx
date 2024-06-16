import Navbar from "./components/Navbar/Navbar-signIn"
import {auth} from "@/app/api/auth/[...nextauth]/auth"
import Inbox from "@/app/components/Inbox"

export default async function Homepage(){
const session = await auth();

  return (
    <div>
      <Navbar />
    <section className="gap-10 mt-12 overflow-hidden sm:grid sm:grid-cols-2 sm:items-center0">
    <div className="p-8 md:p-12 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        
  <h1 className="mt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Never <span className="underline underline-offset-3 decoration-8 decoration-indigo-400">study alone again!</span></h1>
  <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Using StudyWithMe, find someone to study with or look for someone to study with in a matter of minutes!</p>

  
        
  
        <div className="mb-12 mt-8 md:mt-8">
          <a
            href="/api/auth/signin"
            className="inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
          >
           Get studying now!
          </a>
        </div>
      </div>
    </div>
  
    <img
      alt=""
      src="/HomeImage.svg"
      className="mt-12 mb-12 w-fit"
    />
  </section>
  </div>
  )
}
