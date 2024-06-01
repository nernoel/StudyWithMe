export default function StudySessionCard(){
    return (
        <div>
           

            <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
                 {/* Active users in session */}
            <div>
            <div className="flex -space-x-4 rtl:space-x-reverse">
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-5.jpg" alt=""></img>
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-2.jpg" alt=""></img>
                <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-3.jpg" alt=""></img>
                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
            </div>

                <img src="image" className="h-24 w-24" alt="optional image" />
                <div className="p-4">
                    <p className="mb-1 text-sm text-primary-500">Creator <time>18 Nov 2022</time></p>
                    <h3 className="text-xl font-medium text-gray-900">Title</h3>
                    <p className="mt-1 text-gray-500">Descirption.</p>
                <div className="mt-4 flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"> Categoery 1 </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"> Categoery 2  </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">Categoery 3 </span>
            </div>
            </div>
        </div>


        </div>

        </div>
      
    )
}