export default function Hero() {

  return (
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7dd3fc] to-[#c4b5fd] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="-mt-24 mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          
          <div className="text-center">
            <h1 className="-mt-9 text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl">
              Never study alone again!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            By using StudyWithMe <span className="bg-sky-200 text-gray-900"> find someone to study within a matter of minutes!</span> Simply send a message showing interest and it&apos;s as easy as that! Click below to get started!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/auth/login"
                className="rounded-md bg-sky-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started now!
              </a>
              
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
            {/* Bottom right gradient */}
          <div
            className="relative left-[calc(20%+3rem)] aspect-[1155/678] h-[36.125rem] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f0f9ff] to-[#f0f9ff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
  )
}
