import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

const client = new PrismaClient();

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

export default FetchUserName;