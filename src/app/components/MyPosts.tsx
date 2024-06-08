import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import MyPost from "./MyPost";
import CreatePostForm from "@/app/components/CreatePost/CreatePost";

export default async function MyPosts() {

    const prisma = new PrismaClient();
    const session = await auth();

    const myPosts = await prisma.post.findMany({
        where: {
            userEmail: session?.user?.email!
        }
    });

    return (
        <div className="mt-32 container mx-auto p-4">
            <h1 className="text-gray-200 text-3xl font-bold mb-2">Welcome {session?.user?.name!}</h1>
            <hr></hr>
            <h1 className="text-gray-200 text-2xl font-bold mb-4 mt-3">MY STUDY POSTS</h1>
            <div className="flex">
                <CreatePostForm />
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
