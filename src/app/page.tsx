import UserPosts from "./components/MyPosts";
import AllPosts from "./components/AllPosts"
import Navbar from "./components/Navbar";
import {auth} from '@/app/api/auth/[...nextauth]/auth'


export default async function Home(){
  const session = await auth();
  return (
   <div>
    <h1>Index page!</h1>
    <h1 className="text-gray-900 text-3xl font-bold mb-2">👋 Welcome {session?.user?.name!}</h1>
   </div>
  )
}
