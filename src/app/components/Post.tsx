import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

interface Post {
title: string;
description: string;
location: string;
status: string;
// createdAt: Date;
}

// instantiate prisma client
const prisma = new PrismaClient();

// Post component function
export default async function Post({title, description, location, status}: Post) {
    
    // function to fetch user name
    const FetchUserName = async () => {
        "use server";

        try {
            const session = await auth();

            if (!session || !session.user || !session.user.email) {
                throw new Error("No user session found");
            }

            const data = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                select: {
                    name: true,

                },
            });

            if (!data) {
                throw new Error("User not found");
            }
            
            return data.name;

        } catch (error) {
            console.error("Error fetching user image:", error);
            return null;

        } finally {

            await prisma.$disconnect();
        }
    };


    // function to fetch user image
    const FetchUserImage = async () => {
        "use server";

        try {
            const session = await auth();

            if (!session || !session.user || !session.user.email) {
                throw new Error("No user session found");
            }

            const data = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                },
                select: {
                    image: true,

                },
            });

            if (!data) {
                throw new Error("User not found");
            }
            
            return data.image;

        } catch (error) {
            console.error("Error fetching user image:", error);
            return null;

        } finally {

            await prisma.$disconnect();
        }
    };


    
    // defining user properties
    const userName = await FetchUserName();
    const imageUrl = await FetchUserImage();


    return (
        <div className="border-2 border-sky-500 h-72 w-72">
            {/* user post image */}
            {imageUrl ? (
                <img className="w-9 h-9 rounded-full" src={imageUrl} alt="User Image" />
            ) : (
                <p>No image found</p>
            )}
            <div className="p-4 flex flex-col flex-grow">
                {/* user posted by username */}
                <p className="mb-1 text-sm text-primary-500 text-gray-900">
                    Posted by:
                    {userName ? <span>{userName}</span> : <span>No name found</span>}
                </p>
    
                {/* post title */}
                <h3 className="text-xl font-medium text-gray-900">{title}</h3>
    
                {/* post description */}
                <p className="scroll-auto mt-1 text-gray-500 flex-grow overflow-hidden">
                    {description}
                </p>
    
                <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                        Status: {status}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-600">
                        Location: {location}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-gray-100">
                        Request to join
                    </span>
                </div>
            </div>
        </div>
    );
    
}




