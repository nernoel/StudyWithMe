'use client'

import { useState } from 'react';
import { FetchPostData } from '../Helper/FetchPostData';



export default function CreatePostForm() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [start_time, setStartTime] = useState<string>("");
    const [end_time, setEndTime] = useState<string>("");
    const [date, setDate] = useState<string>("");


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle creating post 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // start loading
        try {

            // Fetch all post data to pass into form
            const result = await FetchPostData({title, description, location, start_time, end_time, date});
            console.log('Post created successfully:', result);

            // close modal when created
            setIsModalOpen(false);  

            // Set timeout to refresh the page
            setTimeout(() => {
                window.location.reload();
            },100);
            
        } catch (error) {
            console.error('Error creating post:', error);
        }// finally {
            //setLoading(false); // stop loading
        //}
    };

    // If user description too long prompt user to let them know
    const handleChange = (e: any) => {
        const inputValue = e.target.value;
        const words = inputValue.split(' ').filter(Boolean);
        if (words.length <= 30) {
            setDescription(inputValue);
        }
    };

    // Open modal window
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal window
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="mb-4 rounded-xl font-extrabold text-green-500 bg-green-50 hover:bg-green-700 hover:text-green-50 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Create a new post
            </button>
            
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-sky bg-opacity-50">
                    <div className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center pb-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-200">Create new post</h3>
                            <button
                                className="text-gray-500 hover:text-gray-200"
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="w-6 h-6 bg-red-500 rounded-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                {title.length > 25 ? <label htmlFor="title" className="block text-red-500">Please set a title 25 words or less</label> :
                                    <label htmlFor="description" className="block text-gray-200">Session title</label>}
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    placeholder='Enter a title for your study session...'
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-2 border border-gray-100 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>

                            <div className="mb-4">
                                {description.length > 200 ? <label htmlFor="description" className="block text-red-500">Please enter only 200 characters!</label> :
                                    <label htmlFor="description" className="block text-gray-200">Description</label>}

                                <input
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-200">Location</label>
                                <input
                                    id="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="start_time" className="block text-gray-200">Enter a start time</label>
                                <input
                                    id="start_time"
                                    type="time"
                                    value={start_time}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="end_time" className="block text-gray-200">Enter a end time</label>
                                <input
                                    id="end_time"
                                    type="time"
                                    value={end_time}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-200">Enter a Date</label>
                                <input
                                    id="date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>



                            <button
                                type="submit"
                                className="text-white bg-green-500 focus:outline-none focus:ring-cyan-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Create post
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
