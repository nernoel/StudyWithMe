import { auth } from '@/app/api/auth/[...nextauth]/auth'
import Inbox from '@/app/components/Inbox'
import NavbarSignOut from '../components/Navbar/NavbarSign-out';


export default async function InboxPage() {
    const session = await auth();

    return (
        <div>
            <NavbarSignOut />
            <Inbox userId={session?.user?.id!}/>
        </div>
    )
  }
  