import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

import DeleteButton from '@/app/components/DeleteButton';

interface UserPost {

    id: String;
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
        <div>
            <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
            <img src={imageUrl!} className="mt-1 ml-3 h-12 w-12 rounded-full" alt=""/>
            <div className="p-4">
            <p className="mb-1 text-sm text-primary-500">{userName} • <time>{date}</time></p>
            <h3 className="text-xl font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-gray-500">{description}</p>
            <div className="mt-4 flex gap-2">
            <span
        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
      >
        {start_time} - {end_time}
      </span>
      <span
        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
      >
        {location}
      </span>
      
            </div>
            <span
        className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600 hover:cursor-pointer"
      >
        Edit
      </span>

      <DeleteButton id={id} />




            </div>




            </div>
        </div>
    );
}
