'use client'

import { useState } from 'react';
import { postData } from './index';

export default function CreatePostForm() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await postData({ title, description, location, status });
            console.log('Post created successfully:', result);
            setIsModalOpen(false);  // Close the modal after submission
        } catch (error) {
            console.error('Error creating post:', error);
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
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Create a new post
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center pb-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Create Post</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
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
                                <label htmlFor="title" className="block text-gray-700">Session Title</label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700">Description</label>
                                <input
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700">Location</label>
                                <input
                                    id="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>

                            

                            <button
                                type="submit"
                                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
