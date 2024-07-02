import { SignInGoogleButton } from "@/app/components/Buttons/Sign-in-googleButton"
import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { redirect } from 'next/navigation';


export default async function SignInPage() {
  const session = await auth();
    return (
      <>
      {/* if there is a user session redirect to user dashboard
        */session ? redirect("/pages/dashboard") : ""}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="/StudyWithMeLogo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="place-content-center mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* Sign in with providers */}
          <SignInGoogleButton />
          </div>
        </div>
      </>
    )
  }
  