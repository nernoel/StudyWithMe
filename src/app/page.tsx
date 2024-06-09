import React from 'react';
import MessageForm from './components/MessageForm';
import Inbox from './components/Inbox';

import {auth} from '@/app/api/auth/[...nextauth]/auth'

export default async function Index(){
  const session = await auth();

  return (
    <div>
       <Inbox userId={session?.user?.id!} />
    </div>
  )
}
