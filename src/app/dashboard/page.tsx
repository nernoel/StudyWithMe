import ProfileCard from '@/app/components/ProfileCard'
import StudySessionCard from '../components/StudySessionCard'

import SignOutButton from '@/app/components/buttons/GoToSignout'

export default function Dashboard() {
    return (
        <div>
            <SignOutButton />
            <ProfileCard />

            <h1>Active study sessions</h1>
            <StudySessionCard />


            <h1>My study sessions</h1>
        </div>
    )
}