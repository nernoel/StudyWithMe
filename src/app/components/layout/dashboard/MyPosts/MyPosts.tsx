import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import MyPost from "./MyPost";
import CreatePostForm from "@/app/components/CreatePost/CreatePost";
import Inbox from "../../../Inbox";

export default async function MyPosts() {

    const prisma = new PrismaClient();
    const session = await auth();

    const myPosts = await prisma.post.findMany({
        where: {
            userEmail: session?.user?.email!
        }
    });

    return (
        <div className="mt-4 container mx-auto p-4">
            <h1 className="text-gray-900 text-3xl font-bold mb-2"></h1>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-200 md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-500 from-purple-400">My posts</span> </h1>
            <div className="flex">
                <CreatePostForm />
                <Inbox />
            </div>
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myPosts.map(post => (
                    <MyPost
                        id={post.id}
                        key={post.id}
                        title={post.title}
                        description={post.description}
                        location={post.location}
                        status={post.status}
                        start_time={post.start_time}
                        end_time={post.end_time}
                        date={post.date} 
                                   />
                ))}
            </div>
        </div>
    );
}
