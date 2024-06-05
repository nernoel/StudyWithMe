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

            await client.$disconnect();
        }
    };


    // defining user properties
    const userName = await FetchUserName();
    const imageUrl = await FetchUserImage();


    return (
        
        <div className="w-56 h-56 flex flex-col m-1 p-2 rounded shadow-sm relative hover: ">
          <div className="mb-2">
            {imageUrl ? <img className="w-12 h-12 rounded" src={imageUrl} alt="Post Image" /> : <p>No image found</p>}
          </div>
          <div className="mb-1">
            <span>Posted by {userName}</span>
          </div>
          <div className="font-bold text-xl">
            {title}
          </div>
          <div className="w-full h-full overflow-y-auto transition-all duration-300 ease-in-out bg-white shadow-lg z-10 rounded-b-md">
            <p className="text-sm">{description}</p>
          </div>
        </div>
      );
      
}

