import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/api/auth/[...nextauth]/auth';

interface UserPost {
    id: string;
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
export default async function Post({id, start_time, end_time, date, title, description, location, status }: UserPost) {

    const fetchPostTitle = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },

            select : {
                title: true,
            }
           
        })
        return data?.title;
    }

    const fetchPostDate = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },

            select : {
                date: true,
            }

           
        })
        return data?.date;
    }

    const fetchPostStartTime = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },

            select : {
                start_time: true,
            }
        })
        return data?.start_time;
    }

    const fetchPostEndTime = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },

            select : {
                end_time: true,
            }
        })
        return data?.end_time;
    }



    const postTitle = fetchPostTitle();
    const postDate = fetchPostDate();
    const postStartTime = fetchPostStartTime();
    const postEndTime = fetchPostEndTime();

    return (
        <div>
            <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
            <img src="/AnonUser.png" className="mt-1 ml-3 h-12 w-12 rounded-full" alt=""/>
            <div className="p-4">
            <p className="mb-1 text-sm text-primary-500">Posted by: User • <time>{postDate}</time></p>
            <h3 className="text-xl font-medium text-gray-900">{postTitle}</h3>
            <p className="mt-1 text-gray-500">{description}</p>
            <div className="mt-4 flex gap-2">
            <span
        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
      >
        {postStartTime} - {postEndTime}
      </span>
      <span
        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
      >
        {location}
      </span>
      
            </div>
        
            </div>
            </div>
            
        </div>
    );
}
