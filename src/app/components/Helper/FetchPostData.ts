"use server"

import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth'


interface MyPost {
    title: string;
    description: string;
    location: string;
    start_time: string;
    end_time: string;
    date: string;
}

export const FetchPostData = async ({title, description, location, start_time, end_time, date}: MyPost) => {
    const prisma = new PrismaClient();
    const session = await auth();

    
    try {
        // Create a new post via form information
        const postData = await prisma.post.create({
            data: {
                title: title,
                description: description,
                location: location,
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