import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

const client = new PrismaClient();

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

export default FetchPostOwnerEmail;