import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Post from "@/app/components/Post";
import CreatePostForm from "@/app//components/CreatePost/CreatePost";

export default async function UserPosts(){

    const prisma = new PrismaClient();
    const session = await auth();
    
    const userPosts = await prisma.post.findMany({
        where: {
            userEmail: session?.user?.email! 
        }
    });

    return (
        <div>
            <h1>MY STUDY POSTS</h1>
            <CreatePostForm />
            <div className="flex">
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
    )
}
