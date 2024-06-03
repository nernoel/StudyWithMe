import { PrismaClient } from "@prisma/client";
import StudySessionCard from "../components/StudySessionCard";


export default async function AllPosts(){
    const prisma = new PrismaClient();
    
    // fetching all posts from database
    const myPosts = await prisma.post.findMany();

    return (
        <div>
            <h1>CURRENT STUDY POSTS</h1>
            <div className="flex">
                {myPosts.map(post => (
                    <StudySessionCard
                        key={post.id} 
                        title={post.title}
                        description={post.description}
                        userEmail={post.userEmail} 
                        location={""} 
                        isActive={false} 
                        isPrivate={false} 
                        createdAt={""}                    />
                ))}  
            </div>
        </div>
    )
}