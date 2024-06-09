import AllPosts from "../components/AllPosts";
import MyPosts from "../components/MyPosts";
import Navbar from "../components/Navbar";

export default function Dashboard(){
  return (
    <div>
      <Navbar />
      <MyPosts />
      <AllPosts />
      
    </div>
  )
}
 