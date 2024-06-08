'use client'

import { useState } from 'react';
import { postData } from './index';


export default function CreatePostForm() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [start_time, setStartTime] = useState<string>("");
    const [end_time, setEndTime] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await postData({ title, description, location, status, start_time, end_time, date});
            console.log('Post created successfully:', result);
            setIsModalOpen(false);  
            
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handleChange = (e: any) => {
        const inputValue = e.target.value;
        const words = inputValue.split(' ').filter(Boolean);
        if (words.length <= 30) {
            setDescription(inputValue);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="mb-4 rounded-xl font-extrabold text-green-500 bg-green-50 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Create a new post
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-neutral-950 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center pb-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-200">Create Post</h3>
                            <button
                                className="text-gray-500 hover:text-gray-200"
                                onClick={closeModal}
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="w-6 h-6"
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
                                    type="text"
                                    value={start_time}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="end_time" className="block text-gray-200">Enter a end time</label>
                                <input
                                    id="end_time"
                                    type="text"
                                    value={end_time}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-gray-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-200">Enter a Date</label>
                                <input
                                    id="date"
                                    type="text"
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
