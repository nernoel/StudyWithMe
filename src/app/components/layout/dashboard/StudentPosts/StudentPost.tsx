import { auth } from '@/app/api/auth/[...nextauth]/auth';
import DeleteButton from '@/app/components/DeleteButton';
import { PrismaClient } from '@prisma/client';
import { create } from 'domain';


interface UserPost {
    id: string;
    title: string;
    description: string;
    location: string;
    status: string;
    start_time: string;
    end_time: string;
    date: string;
    createdAt: Date;
}

// instantiate prisma client
const client = new PrismaClient();



// Post component function
export default async function Post({ createdAt, id, start_time, end_time, date, title, description, location, status }: UserPost) {
    const fetchPostTitle = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
                title: true,
            }
        });
        return data?.title;
    };

    const fetchPostDate = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
                date: true,
            }
        });
        return data?.date;
    };

    const fetchPostStartTime = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
                start_time: true,
            }
        });
        return data?.start_time;
    };

    const fetchPostEndTime = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
                end_time: true,
            }
        });
        return data?.end_time;
    };

    const fetchPostCreatedAt = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
               createdAt: true,
            }
        });
        return data?.createdAt;
    };

    const fetchPostOwnerName = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
               user: true,
            }
        });
        return data?.user.name;
    };

    const fetchPostOwnerImage = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
               user: true,
            }
        });
        return data?.user.image;
    };

    const postTitle = await fetchPostTitle();
    const postDate = await fetchPostDate();
    const postStartTime = await fetchPostStartTime();
    const postEndTime = await fetchPostEndTime();
    const postCreatedAt = await fetchPostCreatedAt();
    const postOwner = await fetchPostOwnerName();
    const postOwnerImage = await fetchPostOwnerImage();
    const session = await auth();
    return (
        <div>
            <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
            <div className="relative">
                <img className="mt-1 ml-3 h-12 w-12 rounded-full" src={postOwnerImage != null ? postOwnerImage : "/AnonUser.png" } alt=""></img>
                {session ?  <span className="bottom-0 left-12 absolute  w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                :  <span className="bottom-0 left-12 absolute  w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
               
                </div>
                <div className="p-4">
                    <p className="mb-1 text-sm text-primary-500">Posted by: {postOwner}</p>
                    <h3 className="text-xl font-medium text-gray-900">{postTitle}</h3>
                    <p className="mt-1 text-gray-500">{description}</p>
                    <div className="mt-4 flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                            {postStartTime} - {postEndTime}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                            {location}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
