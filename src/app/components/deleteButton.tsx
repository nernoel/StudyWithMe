'use client'

import { useEffect } from "react"
import { PrismaClient } from '@prisma/client';
import { UUID } from "crypto";

const client = new PrismaClient;
    const handleDelete = async (postID: UUID) => {
        try {
            await client.post.delete({
                where: {
                  id: postID
                },
              })
              console.log("Post successfully deleted");
        } catch(error){
            console.error("Error deleting post!");
        } finally {
            client.$disconnect
        }
    }


export default function deleteButton(){
    return (
        <div>
            <button onClick={handleDelete(pos)}></button>
        </div>
    )

}