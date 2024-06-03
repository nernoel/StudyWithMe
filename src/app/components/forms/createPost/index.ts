"use server"

import { PrismaClient } from '@prisma/client';

interface Props {
    title: string;
    description: string;
    location: string;
    isActive: string;
    isPrivate: string;
}

export const postData = async ({ title, description, location, isActive, isPrivate }: Props) => {
    const prisma = new PrismaClient();
    
    try {
        const postData = await prisma.post.create({
            data: {
                title: title,
                description: description,
                location: location,
                isActive: isActive,
                isPrivate: isPrivate,
                userEmail: "noelerulu@gmail.com"
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
