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
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">MY STUDY POSTS</h1>
            <CreatePostForm />
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
