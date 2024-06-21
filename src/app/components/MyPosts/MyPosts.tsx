import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { PrismaClient } from "@prisma/client";


import MyPost from "./MyPost";
import CreatePostForm from "@/app/components/Forms/CreatePostForm";


export default async function MyPosts() {
    const prisma = new PrismaClient();
    const session = await auth();

    // Fetching all user posts with matching signed in session email
    const myPosts = await prisma.post.findMany({
        where: {
            userEmail: session?.user?.email!
        }
    });

    // Returning post card component JSX
    return (
        <div className="mt-4 container mx-auto p-4">
            <h1 className="text-gray-900 text-3xl font-bold mb-2"></h1>

            <h1 className="mb-4 text font-extrabold text-gray-200 md:text-xl "><span className="-ml-24 text-4xl text-transparent bg-clip-text bg-gradient-to-r to-gray-900 from-gray-900">Below are your current posts</span> </h1>
            <div className="-ml-24 flex">
                <CreatePostForm />
            </div>
            <div className="-ml-24 flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Pass in only id to fetch post data */}
                {myPosts.map(post => ( <MyPost key={post.id} id={post.id} />
                ))}
            </div>
        </div>
    );
}
