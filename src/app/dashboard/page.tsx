import AllPosts from "@/app/components/AllPosts"
import CreatePostForm from "../components/forms/createPost/createPost"

export default function Dashboard(){
    return (
        <div>
            <AllPosts />
            <h1>CREATE POST FORM BASED ON LOGGED IN USER</h1>
            <CreatePostForm />
        </div>
    )
}