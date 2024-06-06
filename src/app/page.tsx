import UserPosts from "./components/UserPosts";
import AllPosts from "./components/AllPosts"
import Navbar from "./components/Navbar";

export default function Home(){
  return (
   <div>
    <Navbar />
    <UserPosts />  
    <AllPosts /> 
   </div>
  )
}
