import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';
import FetchPostOwnerEmail from './FetchPostOwnerEmail'

const client = new PrismaClient();
const email = FetchPostOwnerEmail();

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
                image: true, // FIX THIS LATER TO FETCH FROM DB NOT

            },
        });

        if (!data) {
            throw new Error("User not found");
        }
        return session.user.image;

    } catch (error) {
        console.error("Error fetching user image:", error);
        return null;

    } finally {

       // await client.$disconnect();
    }
};

export default FetchUserImage;