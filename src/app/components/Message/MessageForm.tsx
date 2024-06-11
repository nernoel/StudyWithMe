'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface MessageFormProps {
    senderId: string;
    recipientId: string;
    onMessageSent: () => void; // Callback to handle actions after message is sent
}  

const MessageForm = ({ senderId, recipientId, onMessageSent }: MessageFormProps) => {
    const [content, setContent] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/send', {
                senderId,
                recipientId,
                content,
            });
            setContent('');
            onMessageSent(); // Notify parent component that message is sent
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Message</label>
                <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Send
            </button>
        </form>
    );
};

export default MessageForm;
