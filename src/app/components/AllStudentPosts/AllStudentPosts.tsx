import { PrismaClient } from "@prisma/client";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

import StudentPost from "@/app/components/AllStudentPosts/StudentPost";

export default async function AllStudentPosts() {
    const prisma = new PrismaClient();
    const session = await auth();
   
    // find all posts that are not for the signed-in user
    const studentPosts = await prisma.post.findMany({
        
        where: {
            userEmail: {
                not: session?.user?.email!
            }
        }
    });

    return (
        <div className="container mx-auto p-4">
             <h1 className="mb-4 text font-extrabold text-gray-200 md:text-xl "><span className="-ml-24 text-4xl text-transparent bg-clip-text bg-gradient-to-r to-gray-900 from-gray-900">Posts by other students</span> </h1>
            <div className="">
            </div>
            <div className="-ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studentPosts.map(post => (
                    <StudentPost
                        id={post.id}
                        key={post.id}
                        title={""}
                        description={post.description}
                        location={post.location}
                        start_time={""}
                        end_time={""}
                        date={""} 
                       />
                ))}
            </div>
        </div>
    );
}
