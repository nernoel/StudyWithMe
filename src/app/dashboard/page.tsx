import NavbarSignOut from "../components/layout/navigation/Navbar-signout";
import OtherPosts from "../components/layout/dashboard/StudentPosts/StudentPosts";
import MyPosts from "../components/layout/dashboard/MyPosts/MyPosts";

export default function Dashboard(){
  return (
    <div>
      <NavbarSignOut />
      <MyPosts />
      <OtherPosts />

      <h1>Inbox</h1>

      
      
    </div>
  )
}
 