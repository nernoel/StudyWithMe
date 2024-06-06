"use server"

import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth'


interface Post {
    title: string;
    description: string;
    location: string;
    status: string;
    start_time: string;
    end_time: string;
    date: string;
    // createdAt: Date;
}

export const postData = async ({ start_time, end_time, date, title, description, location, status }: Post) => {
    const prisma = new PrismaClient();
    const session = await auth();

    try {
        const postData = await prisma.post.create({
            data: {
                title: title,
                description: description,
                location: location,
                status: status,
                userEmail: session?.user?.email!,
                start_time: start_time,
                end_time: end_time,
                date: date


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