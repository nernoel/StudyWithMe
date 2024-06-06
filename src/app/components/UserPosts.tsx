import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Post from "@/app/components/Post";
import CreatePostForm from "@/app/components/CreatePost/CreatePost";

export default async function UserPosts() {
    const prisma = new PrismaClient();
    const session = await auth();

    const userPosts = await prisma.post.findMany({
        where: {
            userEmail: session?.user?.email!
        }
    });

    return (
        <div className="mt-52 container mx-auto p-4">
            <h1 className="text-gray-200 text-3xl font-bold mb-2">Welcome {session?.user?.name!}</h1>
            <hr></hr>
            <h1 className="text-gray-200 text-2xl font-bold mb-4 mt-3">MY STUDY POSTS</h1>
            <div className="flex">
            <CreatePostForm />
            <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Delete a post
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPosts.map(post => (
                    <Post 
                        key={post.id} 
                        title={post.title}
                        description={post.description}
                        location={post.location}
                        status={post.status}
                    />
                ))}
            </div>
        </div>
    );
}
