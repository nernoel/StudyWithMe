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

    try {
      await axios.post(`http://localhost:3000/send/${recipientId}`, { senderId, content: message });
      handleSend(message);
      setMessage('');
      handleClose(); // Optionally close modal after sending
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error gracefully, e.g., show an error message to the user
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center ${show ? '' : 'hidden'}`}>
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <button className="absolute top-2 right-2 text-gray-500" onClick={handleClose}>
          &#x2715;
        </button>
        <div className="flex flex-col items-center">
          <div className="w-16 h-10 mb-4">
            <img className="rounded-full" src='/AnonUser.png' alt="Avatar" />
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

export default Modal;
