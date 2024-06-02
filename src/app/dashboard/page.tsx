import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/utils/auth";
import StudySessionCard from "../components/StudySessionCard";
const prisma = new PrismaClient();

// NEED TO WRAP INTO ASYNC FUNCTION WRAPPER
const session = await auth();

const posts = await prisma.post.findMany({
    where: {
        userEmail: session?.user?.email
    }
});





export default function Dashboard() {
    return (
        <div>
            <div>
                {posts.map(post => (
                    <StudySessionCard
                        key={post.id} // don't forget to add a unique key
                        title={post.title}
                        description={post.description}
                        userEmail={post.userEmail}
                    />
                ))}
            </div>
        </div>
    )
}