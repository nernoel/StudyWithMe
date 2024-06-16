import NavbarSignOut from "@/app/components/Navbar/Navbar-signOut";
import MyPosts from "@/app/components/MyPosts/MyPosts";
import AllStudentPosts from "@/app/components/AllStudentPosts/AllStudentPosts";
import Inbox from '@/app/components/Inbox'
import {auth} from '@/app/api/auth/[...nextauth]/auth'


export default async function Dashboard(){
const session = await auth();
  return (
    <>
    <NavbarSignOut />
    <div className="flex">
    <Inbox
      userId={session?.user?.id!}/>
    <MyPosts />
    </div>
    <AllStudentPosts />
    </>
  )
}