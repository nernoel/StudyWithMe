import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { UUID } from 'crypto';

interface UserPost {
    id: UUID;
    title: string;
    description: string;
    location: string;
    status: string;
    start_time: string;
    end_time: string;
    date: string;
    // createdAt: Date;
}

// instantiate prisma client
const client = new PrismaClient();


// Post component function
export default async function MyPost({ id, start_time, end_time, date, title, description, location, status }: UserPost) {


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
        <div className='bg-slate-900 rounded-lg'>
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
                    <span className='ml-3 text-gray-900 text-xl'>Posted by {userName} </span>
                </div>

                <span className='ml-3 text-gray-50 text-2xl font-bold mb-1 font-extrabold'>{title}</span>
                <span className='ml-3 text-gray-50'>{description}</span>
                <div className='flex ml-3 mt-3 mb-3'>
                    <span className='mr-2 bg-indigo-50 text-indigo-500 px-2 py-2 rounded-full font-extrabold'>{date}</span>
                    <span className='bg-blue-50 text-blue-500 px-2 py-2 rounded-full font-extrabold'>{start_time} - {end_time}</span>
                </div>

               
                
                <div className='ml-3 mt-3 mb-3'><span className='bg-cyan-50 text-cyan-500 px-2 py-2 rounded-full font-extrabold'>Location: {location}</span></div>

                <div className='flex'>
                <div className='ml-3 mt-3 mb-3'><span className='bg-yellow-500 text-yellow-50 px-2 py-2 rounded-full font-extrabold'>Edit</span></div>
                <div className='ml-3 mt-3 mb-3'></div>
                </div>
            </div>
        </div>
    );
}
