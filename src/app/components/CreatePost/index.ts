"use server"

import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth'

interface Post {
    title: string;
    description: string;
    location: string;
    status: string;
    // createdAt: Date;
}

export const postData = async ({ title, description, location, status }: Post) => {
    const prisma = new PrismaClient();
    const session = await auth();

    try {
        const postData = await prisma.post.create({
            data: {
                title: title,
                description: description,
                location: location,
                status: status,
                userEmail: session?.user?.email!


            }
        });
        return postData;

    } catch (error) {
        console.error("Error creating post:", error);
        throw error;

    } finally {
        await prisma.$disconnect();
    }
};