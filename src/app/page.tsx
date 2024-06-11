import Navbar from '@/app/components/layout/navigation/Navbar-signin'
import Inbox from './components/Inbox'

import {auth} from '@/app/api/auth/[...nextauth]/auth'
export default async function Index(){
  const session = await auth();
  return (
    <div>
       <Navbar />
       <Inbox userId={session?.user?.id!} />
       
    </div>
  )
}
