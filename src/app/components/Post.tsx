import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

interface UserPost {
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
export default async function Post({ start_time, end_time, date, title, description, location, status }: UserPost) {

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
                {/*<span className="top-2 left-12 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>*/}
                <span className="inline-block size-[46px] bg-gray-100 rounded-full overflow-hidden">
  <svg className="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>
    <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"></path>
    <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"></path>
  </svg>
</span>
                <span className='ml-3 text-gray-200'>Posted by User </span>



                    {/*sessionIsActive ? (
                        <span className="top-2 left-12 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    ) : (
                        <span className="top-2 left-12 absolute w-3.5 h-3.5 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                    {imageUrl ? (
                        <img className="mt-1 ml-3 h-12 w-12 rounded-full" src="/AnonUser.png" />
                    ) : (
                        <p>Image not found</p>
                    )*/}
                    {/*<span className='ml-3 text-gray-200'>Posted by {userName} </span>*/}
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
