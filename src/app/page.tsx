import Navbar from "./components/Navbar/Navbar-signIn"
import {auth} from "@/app/api/auth/[...nextauth]/auth"
import Inbox from "@/app/components/Inbox"

export default async function Homepage(){
const session = await auth();

  return (
    <div>
      <Navbar />
      <Inbox
      userId={session?.user?.id!}/>
      
       
    </div>
  )
}
