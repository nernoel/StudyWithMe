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
const client = new PrismaClient();


// Post component function
export default async function Post({ title, description, location, status }: Post) {

    // function to fetch user name
    const FetchUserName = async () => {
        "use server";

        try {
            const session = await auth();

            if (!session || !session.user || !session.user.email) {
                throw new Error("No user session found");
            }

            const data = await client.user.findUnique({
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

            await client.$disconnect();
        }
    };

    // fetch user email
    const FetchPostOwnerEmail = async () => {
        "use server";

        try {
            const session = await auth();

            if (!session || !session.user || !session.user.email) {
                throw new Error("No user session found");
            }

            const data = await client.user.findUnique({
                where: {
                    email: session.user.email
                },
                select: {
                    email: true,

                },
            });

            if (!data) {
                throw new Error("User not found");
            }
            return data.email;

        } catch (error) {
            console.error("Error fetching user image:", error);
            return null;

        } finally {

            await client.$disconnect();
        }
    };

    const email = await FetchPostOwnerEmail();

    // function to fetch user image
    const FetchUserImage = async () => {
        "use server";

        try {
            const session = await auth();

            if (!session || !session.user || !session.user.email) {
                throw new Error("No user session found");
            }

            const data = await client.user.findUnique({
                where: {
                    email: `${email}`
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

            await client.$disconnect();
        }
    };

    // Fetch session status
    const session = await auth();
    const sessionIsActive = !!session && !!session.user;


    // defining user properties
    const userName = await FetchUserName();
    const imageUrl = await FetchUserImage();
    


    return (
        <div>
            <div className='rounded-lg border-solid border-2 border-sky-200 align-items-center flex flex-col shadow-2xl'>
                <div className="relative">
                    {sessionIsActive ? (
                        <span className="top-2 left-12 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    ) : (
                        <span className="top-2 left-12 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                    {imageUrl ? (
                        <img className="mt-1 ml-3 h-12 w-12 rounded-full" src={imageUrl} />
                    ) : (
                        <p>Image not found</p>
                    )}
                    <span className='ml-3 text-gray-200'>Posted by {userName} </span>
                </div>

                <span className='ml-3 text-gray-200 text-2xl font-bold mb-1'>{title}</span>
                <span className='ml-3 text-gray-200'>{description}</span>
                <div className='ml-3 mt-3 mb-3'><span className='bg-blue-50 text-blue-500 px-2 py-2 rounded-full'>Location {location}</span></div>
                <div className='mt-3 mb-3'>
                    <a href={`mailto:${email}`}>
                        <span className='ml-3 bg-green-50 text-green-500 px-2 py-2 rounded-full'>Message</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
