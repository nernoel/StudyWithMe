'use client'

import React, { useState, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
    handleSend: (message: string) => void;
    image: string;
    recipientId: string;
    senderId: string;
}

const Modal: React.FC<ModalProps> = ({ image, show, handleClose, handleSend, recipientId, senderId }) => {
    const [message, setMessage] = useState<string>('');

    const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await axios.post(`http://localhost:3000/send/${recipientId}`, { senderId, content: message });
        
        let content = {
            "senderId": senderId,
            "recipientId": recipientId,
            "content": message
        }
        handleSend(message);
        setMessage('');
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${show ? '' : 'hidden'}`}>
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
                <button className="absolute top-2 right-2 text-gray-500" onClick={handleClose}>
                    &#x2715;
                </button>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-10 mb-4">
                        <img className="rounded-full" src={image} alt="Avatar" />
                    </div>
                    <textarea
                        className="focus:ring-green-500 w-full h-32 p-2 border rounded mb-4"
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="Type your message here..."
                    ></textarea>
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" onClick={handleSendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

const MessageButton: React.FC<{ recipientId: string; senderId: string; image: string }> = ({ recipientId, senderId, image }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSendMessage = (message: string) => {
        console.log('Message sent:', message);
        setShowAlert(true);
        setShowModal(false);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000); // hide alert after 3 seconds
    };

    return (
        <div className="App">
            <button className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600" onClick={toggleModal}>
                Send Message
            </button>
            <Modal show={showModal} handleClose={toggleModal} handleSend={handleSendMessage} image={image} recipientId={recipientId} senderId={senderId} />
            {showAlert && (
                <div className="absolute right-4 top-4 rounded-xl border border-green-500 bg-green-50 p-4 shadow-lg">
                    <div className="flex items-start gap-4">
                        <span className="text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </span>
                        <div>
                            <strong className="block font-medium text-green-500">Sent!</strong>
                            <p className="mt-1 text-sm text-green-500">Your message has been sent!</p>
                        </div>
                        <button className="text-gray-500 transition hover:text-gray-600" onClick={() => setShowAlert(false)}>
                            <span className="sr-only">Dismiss popup</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageButton;
