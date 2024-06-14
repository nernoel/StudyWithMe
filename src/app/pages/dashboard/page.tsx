import NavbarSignOut from "@/app/components/Navbar/Navbar-signOut";
import MyPosts from "@/app/components/MyPosts/MyPosts";
import AllStudentPosts from "@/app/components/AllStudentPosts/AllStudentPosts";


export default function Dashboard(){
  return (
    <>
    <NavbarSignOut />
    <MyPosts />
    <AllStudentPosts />
    </>
  )
}