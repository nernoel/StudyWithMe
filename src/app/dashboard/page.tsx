import AllPosts from "@/app/components/AllPosts"
import CreatePostForm from "../components/forms/createPost/createPost"

import Navbar from "@/app/components/pageComponents/Navbar";
import MyPosts from "../components/MyPosts";

export default function Dashboard(){
    return (
        <div>
            <div className="mt-52">
            <Navbar />
            

            <MyPosts />
            </div>
        </div>
    )
}