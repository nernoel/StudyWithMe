import { auth } from '@/app/api/auth/[...nextauth]/auth';
import DeleteButton from '@/app/components/Buttons/MyPostDeleteButton';
import { PrismaClient } from '@prisma/client';


interface MyPost {
    id: string;
}

export default async function Post({ id }: MyPost) {
    const client = new PrismaClient();
    const session = await auth();
    const userId = session?.user?.id; // Assuming session contains the logged-in user's ID

    
    // Fetching post title
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

    // Fetching post start time
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

    // Fetching post end time
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

    // Fetching post description
    const fetchPostDescription = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
              description: true,
            }
        });
        return data?.description;
    };

    // Fetching post owner name
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

    // Fetching post owner image
    const fetchPostOwnerImage = async () => {
        const data = await client.user.findUnique({
            where: {
                id: session?.user?.id
            },
            select: {
               image: true,
            }
        });
        return data?.image;
    };

    // Fetching post location
    const fetchPostLocation = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
               location: true,
            }
        });
        return data?.location;
    };

    // Fetching post date
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

    // fetch post owner session
    const fetchSession = async () => {
        const data = await client.post.findUnique({
            where: {
                id: id
            },
            select: {
                user: {
                    select: {
                        sessions: {
                            select: {
                                expires: true,
                                sessionToken: true
                            }
                        }
                    }
                }
            }
        });

        return data?.user.sessions;
    };

    // Calling fetching post owner data
    const postOwner = await fetchPostOwnerName();
    const postOwnerImage = session?.user?.image!
    const userSession = await fetchSession();
    // Calling fetching post data
    const postTitle = await fetchPostTitle();
    const postDescription = await fetchPostDescription();
    const postStartTime = await fetchPostStartTime();
    const postEndTime = await fetchPostEndTime();
    const postLocation = await fetchPostLocation();
    const postDate = await fetchPostDate();

    const convertTo12HourFormat = (time24: String) => {
        const [hours, minutes] = time24.split(':');

        let formattedHours = parseInt(hours, 10);
        let period = 'AM';

        if (formattedHours === 0) {
            formattedHours = 12;

        } else if (formattedHours === 12) {
            period = 'PM';

        } else if (formattedHours > 12) {
            formattedHours -= 12;
            period = 'PM';
        }

        return `${formattedHours}:${minutes} ${period}`;
    };

   
    
    return (
        <div>
            <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
            <div className="relative">
              
                <img className="mt-1 ml-3 h-12 w-12 rounded-full" src={postOwnerImage != null ? postOwnerImage : "/AnonUser.png" } alt=""></img>
                {userSession ? <span className="bottom-0 left-12 absolute  w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                :  <span className="bottom-0 left-12 absolute  w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>}
               
                </div>
                <div className="p-4">
                    
                   
                    <h3 className="text-xl font-medium text-gray-900">{postTitle}</h3>
                    <p className="mt-1 text-gray-500">{postDescription}</p>
                    
                    <div className="mt-4 flex gap-2">
                        
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Occurs on: {postDate?.substring(5,10).replaceAll('-', '/')} from {convertTo12HourFormat(postStartTime!)} -{convertTo12HourFormat(postEndTime!)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                            {postLocation}
                        </span>

                       
                    </div>
                    <DeleteButton id={id} />
                </div>
            </div>
        </div>
    );
}
