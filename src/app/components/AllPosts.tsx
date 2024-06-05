import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Post from "@/app/components/Post";


export default async function AllPosts(){

    const prisma = new PrismaClient();
    const session = await auth();
    
    const userPosts = await prisma.post.findMany();

    return (
        <div className="">
            <div className="flex gap-4">
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
